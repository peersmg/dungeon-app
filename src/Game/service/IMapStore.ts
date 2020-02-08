import { Environment, EnvironmentType } from "../TileTypes";
import Vector2D from "../Engine/Utils/Vector2D";
export interface IMapStore {
  setMap(newMap: Environment[][]): void;
  getMap(): Environment[][] | null;
  getEnvironmentType(id: number): EnvironmentType | null;
  getEnvironmentOf(mapPosition: Vector2D): EnvironmentType | null;
}
