import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import { EnvironmentType } from "../../TileTypes";
import Canvas from "../Canvas";
import Tile2D from "../Utils/Box2D";
import dataStore from "../../../redux/store";
import { GameEntity } from "../../../redux/types";
import { cloneDeep } from "lodash";
import { IMapStore } from "../../service/IMapStore";
import DataStoreService from "../../service/DataStoreService";
import mapJson from "../../../assets/environment_types.json";

class MapRenderComponent extends GameComponent {
  private _position: Vector2D;
  private _mapContent: (Tile2D | null)[][] = [[]];
  private canvas: Canvas | null = null;
  private oldMap: GameEntity[] | null = null;
  private mapStore: IMapStore = new DataStoreService();

  constructor(gameObject: GameObject) {
    super(gameObject);

    if (this.gameObject) {
      this._position = this.gameObject.transform.position;
    } else {
      this._position = new Vector2D(0, 0);
    }
  }

  start(canvas: Canvas): void {
    this.canvas = canvas;

    if (this.mapStore.getMap()) {
      //Init empty object array
      for (let x = 0; x < this.mapStore.getMap()!.length; x++) {
        this.mapContent.push([]);
        for (let y = 0; y < this.mapStore.getMap()![0].length; y++) {
          this.mapContent[x].push(null);
        }
      }

      // Create map objects
      for (let x = 0; x < this.mapStore.getMap()![0].length; x++) {
        for (let y = 0; y < this.mapStore.getMap()!.length; y++) {
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

  public clearMap() {
    for (let x = 0; x < this.mapContent[0].length; x++) {
      for (let y = 0; y < this.mapContent.length; y++) {
        this.removeRenderObj(x, y);
      }
    }
  }

  private removeRenderObj(x: number, y: number) {
    this.canvas?.removeBox(this.mapContent[y][x]);
    this.mapContent[y][x] = null;
  }

  public set position(newPos: Vector2D) {
    this._position = newPos;
  }

  public get position() {
    return this._position;
  }

  private createRenderObject(x: number, y: number) {
    if (this.mapStore.getMap()) {
      let pos = this.getMapPos(y, x);
      let mapTypes: EnvironmentType[] = mapJson;

      let envType = mapTypes.find(val => val.id === this.mapStore.getMap()![x][y]);

      let box: Tile2D | null = null;

      if (envType) {
        box = new Tile2D(
          pos,
          new Vector2D(50, 50),
          envType.backgroundColor,
          envType.textColor,
          envType.character
        );

        this.mapContent[x][y] = box;
      }

      return box;
    }
    return null;
  }

  public getMapPos(x: number, y: number) {
    return new Vector2D(this._position.x + x * 52, this._position.y + y * 52);
  }

  public get mapContent() {
    return this._mapContent;
  }

  public set mapContent(newMapContent: (Tile2D | null)[][]) {
    this._mapContent = newMapContent;
  }
}

export default MapRenderComponent;
