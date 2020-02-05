import { GameMap, GameEntity } from "../types";
import { MapTypes, MapActions } from "../actions/MapActions";
import { Environment } from "../../Game/TileTypes";
import { createReducer } from "../create-reducer";

function addEntity(map: GameMap, action: MapActions) {
  return {
    ...map,
    entities: [...map.entities, action.payload as GameEntity]
  };
}

function updateEntity(map: GameMap, action: MapActions) {
  let newIndex = map.entities.findIndex(
    val => val.objectId === (action.payload as GameEntity).objectId
  );
  map.entities[newIndex] = action.payload as GameEntity;
  return map;
}

function removeEntity(map: GameMap, action: MapActions) {
  let entityIndex = map.entities.findIndex(val => val.objectId === (action.payload as number));
  map.entities.splice(entityIndex, 1);
  return map;
}

function setMap(map: GameMap, action: MapActions) {
  return { ...map, environment: action.payload as Environment[][] };
}

export const mapReducer = createReducer<GameMap, MapTypes, MapActions>(
  { entities: [], environment: [] },
  {
    ADD_ENTITY: addEntity,
    UPDATE_ENTITY: updateEntity,
    REMOVE_ENTITY: removeEntity,
    SET_MAP: setMap
  }
);
