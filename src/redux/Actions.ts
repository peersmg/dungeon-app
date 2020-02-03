import { GameEntity } from "./types";
const UPDATE_FPS = "UPDATE_FPS";
const ADD_ENTITY = "ADD_ENTITY";

interface UpdateFpsAction {
  type: typeof UPDATE_FPS;
  payload: number;
}

interface AddEntityAction {
  type: typeof ADD_ENTITY;
  payload: GameEntity;
}

export type ActionTypes = UpdateFpsAction | AddEntityAction;

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
