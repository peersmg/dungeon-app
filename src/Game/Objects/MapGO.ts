import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import MapComponent from "../Engine/components/MapComponent";
import { Environment } from "../TileTypes";
import Canvas from "../Engine/Canvas";
import { IMapStore } from "../service/IMapStore";
import DataStoreService from "../service/DataStoreService";

const EMPTY_WALL: Environment = 0;
const EMPTY_FLOOR: Environment = 1;

class MapGO extends GameObject {
  private mapStore: IMapStore = new DataStoreService();

  map: Environment[][] = [
    [EMPTY_WALL, EMPTY_WALL, EMPTY_WALL, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL],
    [EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL]
  ];

  boxGrid: MapComponent | null = null;

  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
  }

  start(canvas: Canvas): void {
    for (let i = 0; i < 5; i++) {
      this.map.push([EMPTY_WALL, EMPTY_FLOOR, EMPTY_FLOOR, EMPTY_WALL]);
    }

    this.mapStore.setMap(this.map);

    this.boxGrid = new MapComponent(this);
    this.addComponent(canvas, this.boxGrid);
  }
}

export default MapGO;
