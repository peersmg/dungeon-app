import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import { MapTile, tileMapper } from "../Utils/TileTypes";
import Canvas from "../Canvas";
import Box2D from "../Utils/Box2D";

class BoxGridRenderComponent extends GameComponent {
  private _position: Vector2D;
  private _mapGrid: MapTile[][] = [[]];

  constructor(gameObject: GameObject, mapGrid: MapTile[][]) {
    super(gameObject);

    if (this.gameObject) {
      this._position = this.gameObject.transform.getPosition();
    } else {
      this._position = new Vector2D(0, 0);
    }

    this._mapGrid = mapGrid;
  }

  start(canvas: Canvas): void {
    for (let x = 0; x < this._mapGrid[0].length; x++) {
      for (let y = 0; y < this._mapGrid.length; y++) {
        let pos = new Vector2D(this._position.x + x * 70, this._position.y + y * 70);
        let col = tileMapper(this._mapGrid[y][x]);
        let box: Box2D = new Box2D(pos, new Vector2D(50, 50), col);

        canvas.addBox(box);
      }
    }
  }

  update(): void {
    if (this.gameObject) {
      this._position = this.gameObject.transform.getPosition();
    }
  }

  public set position(newPos: Vector2D) {
    this._position = newPos;
  }

  public get position() {
    return this._position;
  }

  public set mapGrid(newMapGrid: MapTile[][]) {
    this._mapGrid = newMapGrid;
  }

  public get mapGrid() {
    return this._mapGrid;
  }

  public setTile(value: MapTile, x: number, y: number) {
    //this.objectGrid[y][x].color = tileMapper(this._mapGrid[y][x]);
  }
}

export default BoxGridRenderComponent;
