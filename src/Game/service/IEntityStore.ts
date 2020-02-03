import { GameEntity } from "../../redux/types";
export interface IEntityStore {
  addEntity(newEntity: GameEntity): void;
  getEntity(id: number): GameEntity | null;
  updateEntity(updatedEntity: GameEntity): void;
  removeEntity(id: number): void;
}
