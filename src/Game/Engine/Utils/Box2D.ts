import Vector2D from "./Vector2D";

class Box2D {
  private _position: Vector2D;
  private _size: Vector2D;
  private _color: string;

  constructor(position: Vector2D, size: Vector2D, color: string) {
    this._position = position;
    this._size = size;
    this._color = color;
  }

  public get position() {
    return this._position;
  }

  public set position(newPos: Vector2D) {
    this._position = newPos;
  }

  public get size() {
    return this._size;
  }

  public set size(newSize: Vector2D) {
    this._size = newSize;
  }

  public get color() {
    return this._color;
  }

  public set color(newColor: string) {}
}

export default Box2D;
