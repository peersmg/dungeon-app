import { GameState, GameEntity } from "../types";
import { ActionTypes } from "../Actions";
import { Environment } from "../../Game/TileTypes";

const initState: GameState = {
  stats: { FPS: 12 },
  map: { entities: [], environment: [] }
};

function updateFps(state: GameState, action: ActionTypes) {
  return {
    ...state,
    stats: { ...state.stats, FPS: action.payload as number }
  };
}

function addEntity(state: GameState, action: ActionTypes) {
  return {
    ...state,
    map: {
      ...state.map,
      entities: [...state.map.entities, action.payload as GameEntity]
    }
  };
}

function updateEntity(state: GameState, action: ActionTypes) {
  let newIndex = state.map.entities.findIndex(
    val => val.objectId === (action.payload as GameEntity).objectId
  );
  state.map.entities[newIndex] = action.payload as GameEntity;
  return state;
}

function removeEntity(state: GameState, action: ActionTypes) {
  let entityIndex = state.map.entities.findIndex(
    val => val.objectId === (action.payload as number)
  );
  state.map.entities.splice(entityIndex, 1);
  return state;
}

function setMap(state: GameState, action: ActionTypes) {
  return {
    ...state,
    map: { ...state.map, environment: action.payload as Environment[][] }
  };
}

const rootReducer = (state: GameState = initState, action: ActionTypes) => {
  switch (action.type) {
    case "UPDATE_FPS":
      return updateFps(state, action);
    case "ADD_ENTITY":
      return addEntity(state, action);
    case "UPDATE_ENTITY":
      return updateEntity(state, action);
    case "REMOVE_ENTITY":
      return removeEntity(state, action);
    case "SET_MAP":
      return setMap(state, action);
    default:
      break;
  }
  return state;
};

export default rootReducer;
