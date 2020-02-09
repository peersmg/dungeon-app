import { GameEntity } from "../../redux/types";
import Vector2D from "../Engine/Utils/Vector2D";
export interface IEntityStore {
  getEntityAtLocation(mapLocation: Vector2D): GameEntity | null;
  addEntity(newEntity: GameEntity): void;
  getEntity(id: number): GameEntity | null;
  updateEntity(updatedEntity: GameEntity): void;
  removeEntity(id: number): void;
}
