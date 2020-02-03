import { GameState } from "../types";
import { ActionTypes } from "../Actions";

const initState: GameState = {
  stats: { FPS: 12 },
  map: { entities: [], environment: [] }
};

const rootReducer = (state: GameState = initState, action: ActionTypes) => {
  if (action.type === "UPDATE_FPS") {
    return {
      ...state,
      stats: { ...state.stats, FPS: action.payload }
    };
  }
  return state;
};

export default rootReducer;
