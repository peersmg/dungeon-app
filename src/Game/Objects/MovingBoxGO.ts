import GameObject from "../Engine/GameObject";
import BoxRenderComponent from "../components/BoxRenderComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../components/TransformComponent";
import ICanvas from "../Engine/canvas/ICanvas";

class MovingBoxGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;
  constructor(startPos: Vector2D = new Vector2D(0, 0)) {
    super(new TransformComponent(startPos));
    this.startPos = startPos;
  }
  start(canvas: ICanvas): void {
    this.addComponent(canvas, new BoxRenderComponent(this, new Vector2D(10, 10), "blue"));
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.time += deltaTime;
    let updatedPosition = new Vector2D(
      this.transform.position.x,
      this.transform.position.y + Math.cos(this.time * 0.01) * 5
    );

    this.transform.position = updatedPosition;
  }
}

export default MovingBoxGO;
