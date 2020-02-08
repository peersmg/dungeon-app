const SET_HEALTH = "SET_HEALTH";

export type PlayerStatsTypes = typeof SET_HEALTH;
export type PlayerStatsActions = SetHealthAction;

export interface SetHealthAction {
  type: typeof SET_HEALTH;
  payload: number;
}

export function updateFps(newHealth: number): PlayerStatsActions {
  return {
    type: SET_HEALTH,
    payload: newHealth
  };
}
