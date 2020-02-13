import Vector2D from "./Vector2D";
import { Color } from "./Color";

class Tile2D {
  private _position: Vector2D;
  private _size: Vector2D;
  private _bgColor: Color;
  private _txtColor: Color;
  private _char: string;

  constructor(position: Vector2D, size: Vector2D, bgCol: Color, txtCol: Color, char: string) {
    this._position = position;
    this._size = size;
    this._bgColor = bgCol;
    this._txtColor = txtCol;
    this._char = char;
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

  public get bgColor() {
    return this._bgColor;
  }

  public set bgColor(newBgColor: Color) {
    this._bgColor = newBgColor;
  }

  public get txtColor() {
    return this._txtColor;
  }

  public set txtColor(newTxtColor: Color) {
    this._txtColor = newTxtColor;
  }

  public get char() {
    return this._char;
  }

  public set char(newChar: string) {
    this._char = newChar;
  }
}

export default Tile2D;
