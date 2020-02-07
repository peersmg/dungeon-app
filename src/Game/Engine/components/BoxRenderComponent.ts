import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import Canvas from "../Canvas";
import Tile2D from "../Utils/Box2D";

class BoxRenderComponent extends GameComponent {
  private color: string;
  private position: Vector2D;
  private size: Vector2D;

  constructor(gameObject: GameObject, size: Vector2D, color: string) {
    super(gameObject);
    this.color = color;
    this.size = size;

    if (this.gameObject) {
      this.position = this.gameObject.transform.position;
    } else {
      this.position = new Vector2D(0, 0);
    }
  }

  start(canvas: Canvas): void {
    let box = new Tile2D(this.position, this.size, this.color, "red", "X");
    canvas.addBox(box);
  }

  update(): void {
    if (this.gameObject) {
      this.position = this.gameObject.transform.position;
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
}

export default BoxRenderComponent;
