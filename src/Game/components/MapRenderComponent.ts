import GameComponent from "../Engine/GameComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import GameObject from "../Engine/GameObject";
import Tile2D from "../Engine/Utils/Tile2D";
import { IMapStore } from "../service/IMapStore";
import DataStoreService from "../service/DataStoreService";
import ICanvas from "../Engine/canvas/ICanvas";

class MapRenderComponent extends GameComponent {
  private _position: Vector2D;
  private _mapContent: (Tile2D | null)[][] = [[]];
  private canvas: ICanvas | null = null;
  private mapStore: IMapStore = new DataStoreService();

  constructor(gameObject: GameObject) {
    super(gameObject);

    if (this.gameObject) {
      this._position = this.gameObject.transform.position;
    } else {
      this._position = new Vector2D(0, 0);
    }
  }

  start(canvas: ICanvas): void {
    this.canvas = canvas;

    if (this.mapStore.getMap()) {
      //Init empty object array
      // for (let x = 0; x < this.mapStore.getMap()!.length; x++) {
      //   this.mapContent.push([]);
      //   for (let y = 0; y < this.mapStore.getMap()![0].length; y++) {
      //     this.mapContent[x].push(null);
      //   }
      // }
      // Create map objects
      // for (let x = 0; x < this.mapStore.getMap()![0].length; x++) {
      //   for (let y = 0; y < this.mapStore.getMap()!.length; y++) {
      //     if (
      //       this.mapStore
      //         .getEntities()
      //         ?.findIndex(val => val.mapCoord.equals(new Vector2D(x, y))) === -1
      //     ) {
      //       canvas.addTile(this.createRenderObject(y, x));
      //     }
      //   }
      // }
    }
  }

  update(): void {
    if (this.gameObject) {
      this._position = this.gameObject.transform.position;
    }
  }

  // public clearMap() {
  //   for (let x = 0; x < this.mapContent[0].length; x++) {
  //     for (let y = 0; y < this.mapContent.length; y++) {
  //       this.removeRenderObj(x, y);
  //     }
  //   }
  // }

  // private removeRenderObj(x: number, y: number) {
  //   this.canvas?.removeTile(this.mapContent[y][x]);
  //   this.mapContent[y][x] = null;
  // }

  public set position(newPos: Vector2D) {
    this._position = newPos;
  }

  public get position() {
    return this._position;
  }

  // private createRenderObject(x: number, y: number) {
  //   if (this.mapStore.getMap()) {
  //     let pos = this.getMapPos(y, x);
  //     //let mapTypes: EnvironmentType[] = dataStore.getState().map.environmentTypes;

  //     //let envType = mapTypes.find(val => val.id === this.mapStore.getMap()![x][y]);
  //     let envType = new DataStoreService().getEnvironmentOf(new Vector2D(x, y));

  //     let box: Tile2D | null = null;

  //     if (envType) {
  //       box = new Tile2D(
  //         pos,
  //         new Vector2D(50, 50),
  //         envType.zLevel,
  //         envType.appearance.backgroundColor,
  //         envType.appearance.textColor,
  //         envType.appearance.character
  //       );

  //       this.mapContent[x][y] = box;
  //     }

  //     return box;
  //   }
  //   return null;
  // }

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
