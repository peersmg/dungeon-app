import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";

class TransformComponent extends GameComponent {
  private position: Vector2D;
  private scale: Vector2D;
  constructor(
    gameObject: GameObject | null,
    position: Vector2D,
    scale: Vector2D = new Vector2D(1, 1)
  ) {
    super(gameObject);
    this.position = position;
    this.scale = scale;
  }

  getPosition() {
    return this.position;
  }

  getScale() {
    return this.scale;
  }

  setPosition(newPos: Vector2D) {
    this.position = newPos;
  }
}

export default TransformComponent;
