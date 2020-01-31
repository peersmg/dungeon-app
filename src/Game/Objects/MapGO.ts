import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import MapComponent from "../Engine/components/MapComponent";
import { TileContent } from "../Engine/Utils/TileTypes";
import Canvas from "../Engine/Canvas";
import InputManager from "../Engine/InputManager";

const EMPTY_WALL: TileContent = {
  environentUnit: 0,
  entity: { entityType: 0, entityObject: null },
  renderObject: null
};
const EMPTY_FLOOR: TileContent = {
  environentUnit: 1,
  entity: { entityType: 0, entityObject: null },
  renderObject: null
};
const PLAYER: TileContent = {
  environentUnit: 1,
  entity: { entityType: 1, entityObject: null },
  renderObject: null
};

class MapGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;
  playerPos: Vector2D = new Vector2D(1, 1);

  map: TileContent[][] = [
    [EMPTY_WALL, EMPTY_WALL, EMPTY_WALL, EMPTY_WALL],
    [EMPTY_WALL, PLAYER, EMPTY_FLOOR, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_WALL, EMPTY_WALL, EMPTY_WALL]
  ];

  boxGrid: MapComponent | null = null;

  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
    this.startPos = startPos;
  }

  start(canvas: Canvas): void {
    this.boxGrid = new MapComponent(this, this.map);
    this.addComponent(canvas, this.boxGrid);

    InputManager.getInstance().subscribeToEvent(
      "keydown",
      (e: KeyboardEvent) => {
        this.keyPressed(e);
      }
    );
  }

  private keyPressed(e: KeyboardEvent) {
    if (e.key === "d") {
      this.boxGrid?.moveEntity(
        new Vector2D(this.playerPos.y, this.playerPos.x),
        new Vector2D(this.playerPos.y, this.playerPos.x + 1)
      );
      this.playerPos.x++;
    }

    if (e.key === "a") {
      this.boxGrid?.moveEntity(
        new Vector2D(this.playerPos.y, this.playerPos.x),
        new Vector2D(this.playerPos.y, this.playerPos.x - 1)
      );
      this.playerPos.x--;
    }

    if (e.key === "s") {
      this.boxGrid?.moveEntity(
        new Vector2D(this.playerPos.y, this.playerPos.x),
        new Vector2D(this.playerPos.y + 1, this.playerPos.x)
      );
      this.playerPos.y++;
    }

    if (e.key === "w") {
      this.boxGrid?.moveEntity(
        new Vector2D(this.playerPos.y, this.playerPos.x),
        new Vector2D(this.playerPos.y - 1, this.playerPos.x)
      );
      this.playerPos.y--;
    }
  }
}

export default MapGO;
