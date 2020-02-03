import { connect, ConnectedProps } from "react-redux";
import Vector2D from "../Game/Engine/Utils/Vector2D";
import { Environment } from "../Game/TileTypes";

export interface GameStats {
  FPS: number;
}

export interface GameMap {
  entities: { objectId: number; mapCoord: Vector2D }[];
  environment: Environment[][];
}

export const mapGameState = (state: GameState) => {
  return {
    state
  };
};

export const connectGameState = connect(mapGameState);

export type GameStateProp = ConnectedProps<typeof connectGameState>;

export interface GameState {
  stats: GameStats;
  map: GameMap;
}
