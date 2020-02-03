import { GameEntity } from "../../redux/types";
export interface IEntityStore {
  addEntity(newEntity: GameEntity): void;
  getEntity(id: number): GameEntity | null;
  updateEntity(id: number, newState: GameEntity): void;
  removeEntity(id: number): void;
}
