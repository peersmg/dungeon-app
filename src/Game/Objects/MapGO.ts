import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import MapComponent from "../Engine/components/MapComponent";
import { TileContent } from "../TileTypes";
import Canvas from "../Engine/Canvas";

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

class MapGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;
  playerPos: Vector2D = new Vector2D(1, 1);

  map: TileContent[][] = [
    [EMPTY_WALL, EMPTY_WALL, EMPTY_WALL, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL]
  ];

  boxGrid: MapComponent | null = null;

  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
    this.startPos = startPos;
  }

  start(canvas: Canvas): void {
    for (let i = 0; i < 100; i++) {
      this.map.push([EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL]);
    }

    this.boxGrid = new MapComponent(this, this.map);
    this.addComponent(canvas, this.boxGrid);
  }
}

export default MapGO;
