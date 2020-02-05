const UPDATE_FPS = "UPDATE_FPS";

export type StatsTypes = typeof UPDATE_FPS;
export type StatsActions = UpdateFpsAction;

export interface UpdateFpsAction {
  type: typeof UPDATE_FPS;
  payload: number;
}

export function updateFps(newFps: number): StatsActions {
  return {
    type: UPDATE_FPS,
    payload: newFps
  };
}
