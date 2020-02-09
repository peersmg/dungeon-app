import { connect, ConnectedProps } from "react-redux";
import Vector2D from "../Game/Engine/Utils/Vector2D";
import { Environment, EnvironmentType } from "../Game/TileTypes";

export interface GameStats {
  FPS: number;
}

export interface PlayerStats {
  health: number;
}

export interface GameEntity {
  objectId: number;
  mapCoord: Vector2D;
  health: number;
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
  playerStats: PlayerStats;
  map: GameMap;
}
