import GameComponent from "../GameComponent";
import Vector2D from "../Utils/Vector2D";
import GameObject from "../GameObject";
import { EnvironmentType } from "../../TileTypes";
import Canvas from "../Canvas";
import Tile2D from "../Utils/Box2D";
import dataStore from "../../../redux/store";
import { IMapStore } from "../../service/IMapStore";
import DataStoreService from "../../service/DataStoreService";
import mapJson from "../../../assets/environment_types.json";
import { Color } from "../Utils/Color";

class MapRenderComponent extends GameComponent {
  private _position: Vector2D;
  private _mapContent: (Tile2D | null)[][] = [[]];
  private canvas: Canvas | null = null;
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
      let mapTypes: EnvironmentType[] = this.loadEnvJson();

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

  private loadEnvJson(): EnvironmentType[] {
    let envTypes: EnvironmentType[] = [];
    mapJson.forEach(val => {
      let envType: EnvironmentType = {
        id: val.id,
        name: val.name,
        backgroundColor: val.backgroundColor as Color,
        textColor: val.textColor as Color,
        yLevel: val.yLevel,
        character: val.character
      };

      envTypes.push(envType);
    });
    return envTypes;
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
