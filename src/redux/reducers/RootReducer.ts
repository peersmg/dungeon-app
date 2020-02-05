import { GameState, GameEntity, GameStats, GameMap } from "../types";
import { ActionTypes } from "../Actions";
import { Environment } from "../../Game/TileTypes";

const initState: GameState = {
  stats: { FPS: 12 },
  map: { entities: [], environment: [] }
};

function updateFps(gameStats: GameStats, action: ActionTypes) {
  return { ...gameStats, FPS: action.payload as number };
}

function addEntity(map: GameMap, action: ActionTypes) {
  return {
    ...map,
    entities: [...map.entities, action.payload as GameEntity]
  };
}

function updateEntity(map: GameMap, action: ActionTypes) {
  let newIndex = map.entities.findIndex(
    val => val.objectId === (action.payload as GameEntity).objectId
  );
  map.entities[newIndex] = action.payload as GameEntity;
  return map;
}

function removeEntity(map: GameMap, action: ActionTypes) {
  let entityIndex = map.entities.findIndex(val => val.objectId === (action.payload as number));
  map.entities.splice(entityIndex, 1);
  return map;
}

function setMap(map: GameMap, action: ActionTypes) {
  return { ...map, environment: action.payload as Environment[][] };
}

function gameStatsReducer(gameStats: GameStats, action: ActionTypes) {
  switch (action.type) {
    case "UPDATE_FPS":
      return updateFps(gameStats, action);
    default:
      return gameStats;
  }
}

function mapReducer(map: GameMap, action: ActionTypes) {
  switch (action.type) {
    case "ADD_ENTITY":
      return addEntity(map, action);
    case "UPDATE_ENTITY":
      return updateEntity(map, action);
    case "REMOVE_ENTITY":
      return removeEntity(map, action);
    case "SET_MAP":
      return setMap(map, action);
    default:
      return map;
  }
}

const rootReducer = (state: GameState = initState, action: ActionTypes) => {
  return { stats: gameStatsReducer(state.stats, action), map: mapReducer(state.map, action) };
};

export default rootReducer;
