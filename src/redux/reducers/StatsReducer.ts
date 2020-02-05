import { createReducer } from "../create-reducer";
import { GameStats } from "../types";
import { Actions, StatsTypes, StatsActions } from "../Actions";

function updateFps(gameStats: GameStats, action: Actions) {
  return { ...gameStats, FPS: action.payload as number };
}

export const gameStatsReducer = createReducer<GameStats, StatsTypes, StatsActions>(
  { FPS: -1 },
  {
    UPDATE_FPS: updateFps
  }
);
