import { Environment } from "../TileTypes";
export interface IMapStore {
  setMap(newMap: Environment[][]): void;
  getMap(): Environment[][] | null;
}
