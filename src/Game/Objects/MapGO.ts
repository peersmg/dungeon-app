import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import BoxGridRenderComponent from "../Engine/components/BoxGridRenderComponent";

class MapGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;
  map: (0 | 1)[][] = [
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

  start(): void {
    this.boxGrid = new BoxGridRenderComponent(this, this.map);
    this.addComponent(this.boxGrid);

    this.boxGrid.setTile(0, 0, 2);
  }
}

export default MapGO;
