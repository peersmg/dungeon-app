import Box2D from "./Box2D";
import GameObject from "../GameObject";

export type Entity = {
  entityType: EntityType;
  entityObject: GameObject | null;
};

export type TileContent = {
  environentUnit: Environment;
  entity: Entity;
  renderObject: Box2D | null;
};

export type Environment = 0 | 1 | 2;
export const tileMapper = (environmentType: Environment) => {
  switch (environmentType) {
    case 0:
      return "blue";
    case 1:
      return "white";
    case 2:
      return "red";
    default:
      return "grey";
  }
};

export const PLAYER_ENTITY = "purple";
export const NO_ENTITY = "none";

export type EntityType = 0 | 1;
export const entityMapper = (entityType: EntityType) => {
  switch (entityType) {
    case 0:
      return NO_ENTITY;
    case 1:
      return PLAYER_ENTITY;
    default:
      return NO_ENTITY;
  }
};
