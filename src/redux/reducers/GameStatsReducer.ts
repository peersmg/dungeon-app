import { createReducer } from "../create-reducer";
import { GameStats } from "../types";
import { StatsActions, StatsTypes } from "../actions/StatsActions";

function updateFps(gameStats: GameStats, action: StatsActions) {
  return { ...gameStats, FPS: action.payload as number };
}

export const gameStatsReducer = createReducer<GameStats, StatsTypes, StatsActions>(
  { FPS: -1 },
  {
    UPDATE_FPS: updateFps
  }
);
