import { PlayerStats } from "../types";
import { PlayerStatsActions, PlayerStatsTypes } from "../actions/PlayerStatsActions";
import { createReducer } from "../create-reducer";

function setHealth(playerStats: PlayerStats, action: PlayerStatsActions) {
  return { ...playerStats, health: action.payload as number };
}

export const playerStatsReducer = createReducer<PlayerStats, PlayerStatsTypes, PlayerStatsActions>(
  { health: 0 },
  {
    SET_HEALTH: setHealth
  }
);
