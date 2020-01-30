import GameObject from "./GameObject";
import Canvas from "./Canvas";

abstract class GameComponent {
  gameObject: GameObject | null;
  constructor(gameObject: GameObject | null) {
    this.gameObject = gameObject;
  }
  abstract start(canvas: Canvas): void;
  update(): void {}
  draw(renderContext: Canvas): void {}
}

export default GameComponent;
