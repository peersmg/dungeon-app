import { GameEntity } from "./types";
import { Environment } from "../Game/TileTypes";
const UPDATE_FPS = "UPDATE_FPS";

const ADD_ENTITY = "ADD_ENTITY";
const UPDATE_ENTITY = "UPDATE_ENTITY";
const REMOVE_ENTITY = "REMOVE_ENTITY";

const SET_MAP = "SET_MAP";

export type StatsTypes = typeof UPDATE_FPS;

export type MapTypes =
  | typeof ADD_ENTITY
  | typeof UPDATE_ENTITY
  | typeof REMOVE_ENTITY
  | typeof SET_MAP;

export interface UpdateFpsAction {
  type: typeof UPDATE_FPS;
  payload: number;
}

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

export type StatsActions = UpdateFpsAction;
export type MapActions = AddEntityAction | UpdateEntityAction | RemoveEntityAction | SetMapAction;

export type Actions =
  | UpdateFpsAction
  | AddEntityAction
  | UpdateEntityAction
  | RemoveEntityAction
  | SetMapAction;

// TypeScript infers that this function is returning UpdateFpsAction
export function updateFps(newFps: number): Actions {
  return {
    type: UPDATE_FPS,
    payload: newFps
  };
}

export function addEntity(newEntity: GameEntity): Actions {
  return {
    type: ADD_ENTITY,
    payload: newEntity
  };
}

export function updateEntity(updatedEntity: GameEntity): Actions {
  return {
    type: UPDATE_ENTITY,
    payload: updatedEntity
  };
}

export function removeEntity(entityId: number): Actions {
  return {
    type: REMOVE_ENTITY,
    payload: entityId
  };
}

export function setMap(newMap: Environment[][]): Actions {
  return {
    type: SET_MAP,
    payload: newMap
  };
}
