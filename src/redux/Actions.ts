import { GameEntity } from "./types";
const UPDATE_FPS = "UPDATE_FPS";
const ADD_ENTITY = "ADD_ENTITY";
const UPDATE_ENTITY = "UPDATE_ENTITY";
const REMOVE_ENTITY = "REMOVE_ENTITY";

interface UpdateFpsAction {
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

export type ActionTypes =
  | UpdateFpsAction
  | AddEntityAction
  | UpdateEntityAction
  | RemoveEntityAction;

// TypeScript infers that this function is returning UpdateFpsAction
export function updateFps(newFps: number): ActionTypes {
  return {
    type: UPDATE_FPS,
    payload: newFps
  };
}

export function addEntity(newEntity: GameEntity): ActionTypes {
  return {
    type: ADD_ENTITY,
    payload: newEntity
  };
}

export function updateEntity(updatedEntity: GameEntity): ActionTypes {
  return {
    type: UPDATE_ENTITY,
    payload: updatedEntity
  };
}

export function removeEntity(entityId: number): ActionTypes {
  return {
    type: REMOVE_ENTITY,
    payload: entityId
  };
}
