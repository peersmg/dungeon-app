import GameComponent from "../GameComponent";
import { Environment } from "../../TileTypes";

import mapJson from "../../../assets/default_map.json";
import dataStore from "../../../redux/store";
import { setMap } from "../../../redux/actions/MapActions";

interface LoadedMap {
  map: Environment[][];
}

class MapLoadComponent extends GameComponent {
  start(): void {}

  public loadMap() {
    let loadedMap: LoadedMap = mapJson as LoadedMap;
    dataStore.dispatch(setMap(loadedMap.map));
  }
}
export default MapLoadComponent;
