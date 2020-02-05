import { GameState } from "../types";
import { ActionTypes } from "../Actions";

const initState: GameState = {
  stats: { FPS: 12 },
  map: { entities: [], environment: [] }
};

const rootReducer = (state: GameState = initState, action: ActionTypes) => {
  switch (action.type) {
    case "UPDATE_FPS":
      return {
        ...state,
        stats: { ...state.stats, FPS: action.payload }
      };
    case "ADD_ENTITY":
      return {
        ...state,
        map: { ...state.map, entities: [...state.map.entities, action.payload] }
      };
    case "UPDATE_ENTITY":
      let newIndex = state.map.entities.findIndex(
        val => val.objectId === action.payload.objectId
      );
      state.map.entities[newIndex] = action.payload;
      return state;
    case "REMOVE_ENTITY":
      let entityIndex = state.map.entities.findIndex(
        val => val.objectId === action.payload
      );
      state.map.entities.splice(entityIndex, 1);
      return state;
    case "SET_MAP":
      return {
        ...state,
        map: { ...state.map, environment: action.payload }
      };
    default:
      break;
  }
  return state;
};

export default rootReducer;
