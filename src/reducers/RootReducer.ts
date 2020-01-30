import { GameState } from "./types";
import { ActionTypes } from "./Actions";

const initState: GameState = {
  gameStats: { FPS: 12 }
};

const rootReducer = (state: GameState = initState, action: ActionTypes) => {
  if (action.type === "UPDATE_FPS") {
    return {
      ...state,
      gameStats: { ...state.gameStats, FPS: action.payload }
    };
  }
  return state;
};

export default rootReducer;
