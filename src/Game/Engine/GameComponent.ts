import GameObject from "./GameObject";

abstract class GameComponent {
  gameObject: GameObject | null;
  constructor(gameObject: GameObject | null) {
    this.gameObject = gameObject;
  }
  update(): void {}
  draw(renderContext: CanvasRenderingContext2D): void {}
}

export default GameComponent;
