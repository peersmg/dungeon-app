import GameComponent from "../Engine/GameComponent";
import Vector2D from "../Engine/Utils/Vector2D";

class TransformComponent extends GameComponent {
  private _position: Vector2D;
  private _scale: Vector2D;

  constructor(position: Vector2D, scale: Vector2D = new Vector2D(1, 1)) {
    super(null);
    this._position = position;
    this._scale = scale;
  }

  start() {}

  public get position() {
    return this._position;
  }

  public set position(newPos: Vector2D) {
    this._position = newPos;
  }

  public get scale() {
    return this._scale;
  }

  public set scale(newScale: Vector2D) {
    this._scale = newScale;
  }
}

export default TransformComponent;
