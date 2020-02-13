import GameComponent from "../Engine/GameComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import GameObject from "../Engine/GameObject";
import Tile2D from "../Engine/Utils/Tile2D";
import { Color } from "../Engine/Utils/Color";
import ICanvas from "../Engine/canvas/ICanvas";

class BoxRenderComponent extends GameComponent {
  private color: Color;
  private position: Vector2D;
  private size: Vector2D;

  constructor(gameObject: GameObject, size: Vector2D, color: Color) {
    super(gameObject);
    this.color = color;
    this.size = size;

    if (this.gameObject) {
      this.position = this.gameObject.transform.position;
    } else {
      this.position = new Vector2D(0, 0);
    }
  }

  start(canvas: ICanvas): void {
    let box = new Tile2D(this.position, this.size, this.color, "red", "X");
    canvas.addTile(box);
  }

  update(): void {
    if (this.gameObject) {
      this.position = this.gameObject.transform.position;
    }
  }

  setColor(newColor: Color) {
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
