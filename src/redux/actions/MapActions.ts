import { GameEntity } from "../types";
import { Environment } from "../../Game/TileTypes";

const ADD_ENTITY = "ADD_ENTITY";
const UPDATE_ENTITY = "UPDATE_ENTITY";
const REMOVE_ENTITY = "REMOVE_ENTITY";

const SET_MAP = "SET_MAP";

export type MapTypes =
  | typeof ADD_ENTITY
  | typeof UPDATE_ENTITY
  | typeof REMOVE_ENTITY
  | typeof SET_MAP;

export type MapActions = AddEntityAction | UpdateEntityAction | RemoveEntityAction | SetMapAction;

interface AddEntityAction {
  type: typeof ADD_ENTITY;
  payload: GameEntity;
}

interface UpdateEntityAction {
  type: typeof UPDATE_ENTITY;
  payload: GameEntity;
}

interface RemoveEntityAction {
  type: typeof REMOVE_ENTITY;
  payload: number;
}

interface SetMapAction {
  type: typeof SET_MAP;
  payload: Environment[][];
}

export function addEntity(newEntity: GameEntity): MapActions {
  return {
    type: ADD_ENTITY,
    payload: newEntity
  };
}

export function updateEntity(updatedEntity: GameEntity): MapActions {
  return {
    type: UPDATE_ENTITY,
    payload: updatedEntity
  };
}

export function removeEntity(entityId: number): MapActions {
  return {
    type: REMOVE_ENTITY,
    payload: entityId
  };
}

export function setMap(newMap: Environment[][]): MapActions {
  return {
    type: SET_MAP,
    payload: newMap
  };
}
