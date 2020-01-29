import GameObject from "../Engine/GameObject";
import BoxRenderComponent from "../components/BoxRenderComponent";
import Vector2D from "../Utils/Vector2D";
import TransformComponent from "../components/TransformComponent";

class MovingBoxGO extends GameObject {
  time: number = 0;
  startPos: Vector2D;
  constructor(startPos: Vector2D = new Vector2D(0, 0)) {
    super(new TransformComponent(null, startPos));
    this.startPos = startPos;
  }
  start(): void {
    this.addComponent(
      new BoxRenderComponent(this, new Vector2D(100, 100), "blue")
    );
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.time += deltaTime;
    let updatedPosition = new Vector2D(
      this.transform.getPosition().x,
      this.transform.getPosition().y + Math.cos(this.time * 0.01) * 5
    );

    this.transform.setPosition(updatedPosition);
  }
}

export default MovingBoxGO;