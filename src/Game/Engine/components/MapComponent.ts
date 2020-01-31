import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import {
  Environment,
  tileMapper,
  TileContent,
  entityMapper
} from "../Utils/TileTypes";
import Canvas from "../Canvas";
import Box2D from "../Utils/Box2D";

class MapComponent extends GameComponent {
  private _position: Vector2D;
  private _mapContent: TileContent[][] = [[]];

  constructor(gameObject: GameObject, mapContents: TileContent[][]) {
    super(gameObject);

    if (this.gameObject) {
      this._position = this.gameObject.transform.getPosition();
    } else {
      this._position = new Vector2D(0, 0);
    }

    this.mapContent = mapContents;
  }

  start(canvas: Canvas): void {
    for (let x = 0; x < this.mapContent[0].length; x++) {
      for (let y = 0; y < this.mapContent.length; y++) {
        let pos = new Vector2D(
          this._position.x + x * 70,
          this._position.y + y * 70
        );

        let col =
          this.mapContent[y][x].entity === 0
            ? tileMapper(this.mapContent[y][x].environentUnit)
            : entityMapper(this.mapContent[y][x].entity);

        let box: Box2D = new Box2D(pos, new Vector2D(50, 50), col);

        this.mapContent[y][x] = { ...this.mapContent[x][y], object: box };

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

  public setTile(value: Environment, x: number, y: number) {
    //this.objectGrid[y][x].color = tileMapper(this._mapGrid[y][x]);
  }

  public get mapContent() {
    return this._mapContent;
  }

  public set mapContent(newMapContent: TileContent[][]) {
    this._mapContent = newMapContent;
  }
}

export default MapComponent;
