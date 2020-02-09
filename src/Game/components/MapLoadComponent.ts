import GameComponent from "../Engine/GameComponent";
import { Environment } from "../TileTypes";

import mapJson from "../../assets/default_map.json";
import DataStoreService from "../service/DataStoreService";

interface LoadedMap {
  map: Environment[][];
}

class MapLoadComponent extends GameComponent {
  start(): void {}

  public loadMap() {
    let loadedMap: LoadedMap = mapJson as LoadedMap;
    new DataStoreService().setMap(loadedMap.map);
  }
}
export default MapLoadComponent;
