import { IEntityStore } from "./IEntityStore";
import { GameEntity } from "../../redux/types";
import dataStore from "../../redux/store";
import { addEntity } from "../../redux/Actions";
class DataStoreService implements IEntityStore {
  addEntity(newEntity: GameEntity): void {
    dataStore.dispatch(addEntity(newEntity));
  }
  getEntity(id: number): GameEntity | null {
    let entity = dataStore.getState().map.entities.find(obj => obj.objectId === id);

    if (entity) {
      return entity;
    } else {
      return null;
    }
  }
  updateEntity(id: number, newState: GameEntity): void {
    throw new Error("Method not implemented.");
  }
  removeEntity(id: number): void {
    throw new Error("Method not implemented.");
  }
}

export default DataStoreService;
