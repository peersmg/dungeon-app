import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import { tileMapper, TileContent, entityMapper } from "../../TileTypes";
import Canvas from "../Canvas";
import Box2D from "../Utils/Box2D";
import dataStore from "../../../redux/store";
import { GameEntity } from "../../../redux/types";
import { cloneDeep } from "lodash";

class MapComponent extends GameComponent {
  private _position: Vector2D;
  private _mapContent: TileContent[][] = [[]];
  private canvas: Canvas | null = null;
  private oldMap: GameEntity[] | null = null;

  constructor(gameObject: GameObject, mapContents: TileContent[][]) {
    super(gameObject);

    if (this.gameObject) {
      this._position = this.gameObject.transform.position;
    } else {
      this._position = new Vector2D(0, 0);
    }

    this.mapContent = mapContents;
  }

  start(canvas: Canvas): void {
    this.canvas = canvas;
    for (let x = 0; x < this.mapContent[0].length; x++) {
      for (let y = 0; y < this.mapContent.length; y++) {
        if (
          dataStore
            .getState()
            .map.entities.findIndex(val => val.mapCoord.equals(new Vector2D(x, y))) === -1
        ) {
          canvas.addBox(this.createRenderObject(y, x));
        }
      }
    }
  }

  update(): void {
    if (this.gameObject) {
      this._position = this.gameObject.transform.position;
    }

    this.updateMap();
  }

  private updateMap() {
    let currentMap: GameEntity[] = cloneDeep(dataStore.getState().map.entities);
    if (this.oldMap) {
      let newEntities = currentMap.filter(x => !this.oldMap!.includes(x));
      let removedEntities = this.oldMap.filter(
        x => currentMap.findIndex(i => x.objectId === i.objectId) === -1
      );
      let modifiedEntities = currentMap.filter(
        x => this.oldMap?.findIndex(i => !x.mapCoord.equals(i.mapCoord)) !== -1
      );

      if (removedEntities.length > 0) {
        console.log(removedEntities);
      }

      // MODIFIED ENTITIES
      modifiedEntities.forEach(val => {
        // remove render object in new location
        this.removeRenderObj(val.mapCoord.x, val.mapCoord.y);

        // create render object in old location
        let oldPos = this.oldMap!.find(x => x.objectId === val.objectId)!.mapCoord;
        let box = this.createRenderObject(oldPos.y, oldPos.x);
        this.canvas?.addBox(box);
      });

      // REMOVED ENTITIES
      removedEntities.forEach(val => {
        // create render object in location
        let box = this.createRenderObject(val.mapCoord.y, val.mapCoord.x);
        this.canvas?.addBox(box);
      });

      // NEW ENTITIES
      newEntities.forEach(val => {
        // remove render object in new location
        this.removeRenderObj(val.mapCoord.x, val.mapCoord.y);
      });
    }

    this.oldMap = cloneDeep(currentMap);
  }

  private removeRenderObj(x: number, y: number) {
    this.canvas?.removeBox(this.mapContent[y][x].renderObject);
    this.mapContent[y][x].renderObject = null;
  }

  public set position(newPos: Vector2D) {
    this._position = newPos;
  }

  public get position() {
    return this._position;
  }

  private createRenderObject(x: number, y: number) {
    let pos = this.getMapPos(y, x);

    let col =
      this.mapContent[x][y].entity.entityType === 0
        ? tileMapper(this.mapContent[x][y].environentUnit)
        : entityMapper(this.mapContent[x][y].entity.entityType);

    let box: Box2D = new Box2D(pos, new Vector2D(50, 50), col);

    this.mapContent[x][y] = { ...this.mapContent[x][y], renderObject: box };
    return box;
  }

  public getMapPos(x: number, y: number) {
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
