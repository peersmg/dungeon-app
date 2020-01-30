import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import BoxGridRenderComponent from "../Engine/components/BoxGridRenderComponent";
import { MapTile } from "../Engine/Utils/TileTypes";
import Canvas from "../Engine/Canvas";

class MapGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;
  map: MapTile[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ];

  boxGrid: BoxGridRenderComponent | null = null;

  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
    this.startPos = startPos;
  }

  start(canvas: Canvas): void {
    this.boxGrid = new BoxGridRenderComponent(this, this.map);
    this.addComponent(canvas, this.boxGrid);

    this.boxGrid.setTile(2, 4, 2);
  }
}

export default MapGO;
