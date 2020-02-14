import GameObject from "./GameObject";

abstract class GameComponent {
  gameObject: GameObject | null;
  constructor(gameObject: GameObject | null) {
    this.gameObject = gameObject;
  }
  abstract start(): void;
  update(): void {}
  draw(): void {}
}

export default GameComponent;
