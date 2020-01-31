import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import MapComponent from "../Engine/components/MapComponent";
import { TileContent } from "../Engine/Utils/TileTypes";
import Canvas from "../Engine/Canvas";

const EMPTY_WALL: TileContent = { environentUnit: 0, entity: 0, object: null };
const EMPTY_FLOOR: TileContent = { environentUnit: 1, entity: 0, object: null };

class MapGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;

  map: TileContent[][] = [
    [EMPTY_WALL, EMPTY_WALL, EMPTY_WALL, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL],
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

    this.boxGrid.setTile(2, 4, 2);
  }
}

export default MapGO;
