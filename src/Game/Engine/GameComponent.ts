import GameObject from "./GameObject";
import ICanvas from "./canvas/ICanvas";

abstract class GameComponent {
  gameObject: GameObject | null;
  constructor(gameObject: GameObject | null) {
    this.gameObject = gameObject;
  }
  abstract start(canvas: ICanvas): void;
  update(): void {}
  draw(): void {}
}

export default GameComponent;
