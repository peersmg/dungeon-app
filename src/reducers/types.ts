import { connect, ConnectedProps } from "react-redux";

export interface GameStats {
  FPS: number;
}

export const mapGameStats = (state: GameState) => {
  return {
    gameStats: state.gameStats
  };
};

export const connectGameStats = connect(mapGameStats);

export type GameStatsProp = ConnectedProps<typeof connectGameStats>;

export interface GameState {
  gameStats: GameStats;
}
