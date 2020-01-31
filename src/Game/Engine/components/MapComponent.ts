import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import { tileMapper, TileContent, entityMapper } from "../Utils/TileTypes";
import Canvas from "../Canvas";
import Box2D from "../Utils/Box2D";

class MapComponent extends GameComponent {
  private _position: Vector2D;
  private _mapContent: TileContent[][] = [[]];
  private canvas: Canvas | null = null;

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
    this.canvas = canvas;
    for (let x = 0; x < this.mapContent[0].length; x++) {
      for (let y = 0; y < this.mapContent.length; y++) {
        canvas.addBox(this.createRenderObject(y, x));
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

  public moveEntity(currentPos: Vector2D, newPos: Vector2D) {
    // Remove render object in new location
    this.canvas?.removeBox(this.mapContent[newPos.x][newPos.y].renderObject);
    this.mapContent[newPos.x][newPos.y].renderObject = null;

    // Move render object to new location
    if (this.mapContent[currentPos.x][currentPos.y].renderObject) {
      this.mapContent[currentPos.x][
        currentPos.y
      ].renderObject!.position = this.getMapPos(newPos.y, newPos.x);

      this.mapContent[newPos.x][newPos.y].renderObject = this.mapContent[
        currentPos.x
      ][currentPos.y].renderObject;
    }

    // Move current entity to new position
    this.mapContent[newPos.x][newPos.y].entity = this.mapContent[currentPos.y][
      currentPos.x
    ].entity;

    this.mapContent[currentPos.x][currentPos.y].entity = {
      entityType: 0,
      entityObject: null
    };

    // Create new render object in old position
    let box = this.createRenderObject(currentPos.x, currentPos.y);
    this.canvas?.addBox(box);
  }

  private createRenderObject(x: number, y: number) {
    let pos = this.getMapPos(y, x);

    let col =
      this.mapContent[x][y].entity.entityType === 0
        ? tileMapper(this.mapContent[x][y].environentUnit)
        : entityMapper(this.mapContent[x][y].entity.entityType);

    //ObjectManager.getInst().add(new Player(this))

    let box: Box2D = new Box2D(pos, new Vector2D(50, 50), col);

    this.mapContent[x][y] = { ...this.mapContent[x][y], renderObject: box };
    return box;
  }

  private getMapPos(x: number, y: number) {
    return new Vector2D(this._position.x + x * 70, this._position.y + y * 70);
  }

  public get mapContent() {
    return this._mapContent;
  }

  public set mapContent(newMapContent: TileContent[][]) {
    this._mapContent = newMapContent;
  }
}

export default MapComponent;
