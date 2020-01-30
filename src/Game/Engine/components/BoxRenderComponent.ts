import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";

class BoxRenderComponent extends GameComponent {
  private color: string;
  private position: Vector2D;
  private size: Vector2D;

  constructor(gameObject: GameObject, size: Vector2D, color: string) {
    super(gameObject);
    this.color = color;
    this.size = size;

    if (this.gameObject) {
      this.position = this.gameObject.transform.getPosition();
    } else {
      this.position = new Vector2D(0, 0);
    }
  }

  update(): void {
    if (this.gameObject) {
      this.position = this.gameObject.transform.getPosition();
    }
  }

  setColor(newColor: string) {
    this.color = newColor;
  }

  setPosition(newPosition: Vector2D) {
    this.position = newPosition;
  }

  getPosition(newPosition: Vector2D) {
    return this.position;
  }

  setSize(newSize: Vector2D) {
    this.size = newSize;
  }

  draw(renderContext: CanvasRenderingContext2D): void {
    renderContext.fillStyle = this.color;
    renderContext.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }
}

export default BoxRenderComponent;
