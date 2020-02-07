import GameObject from "./Engine/GameObject";

export type Entity = {
  entityType: EntityType;
  entityObject: GameObject | null;
};

export type Environment = 0 | 1 | 2;

export interface EnvironmentType {
  id: number;
  name: string;
  backgroundColor: string;
  textColor: string;
  yLevel: number;
  character: string;
}

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
