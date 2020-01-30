const UPDATE_FPS = "UPDATE_FPS";

interface UpdateFpsAction {
  type: typeof UPDATE_FPS;
  payload: number;
}

export type ActionTypes = UpdateFpsAction;

// TypeScript infers that this function is returning UpdateFpsAction
export function updateFps(newFps: number): ActionTypes {
  return {
    type: UPDATE_FPS,
    payload: newFps
  };
}
