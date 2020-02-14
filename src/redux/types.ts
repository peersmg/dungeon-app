import { connect, ConnectedProps } from "react-redux";
import Vector2D from "../Game/Engine/Utils/Vector2D";
import { Environment, EnvironmentType, Appearance2D, Appearance3D } from "../Game/TileTypes";

export interface GameStats {
  FPS: number;
}

export enum EntityTag {
  PLAYER,
  ENEMY,
  ITEM
}

export interface GameEntity {
  objectId: number;
  tag: EntityTag;
  mapCoord: Vector2D;
  health: number;
  strength: number;
  appearance2D: Appearance2D;
  appearance3D: Appearance3D;
}

export interface GameMap {
  entities: GameEntity[];
  environment: Environment[][];
  environmentTypes: EnvironmentType[];
}

export const mapGameState = (state: GameState) => {
  return {
    state
  };
};

export const connectGameState = connect(mapGameState);

export type GameStateProp = ConnectedProps<typeof connectGameState>;

export interface GameState {
  gameStats: GameStats;
  map: GameMap;
}
