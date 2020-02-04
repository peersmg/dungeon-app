import { IEntityStore } from "./IEntityStore";
import { GameEntity } from "../../redux/types";
import dataStore from "../../redux/store";
import { addEntity, updateEntity, removeEntity } from "../../redux/Actions";

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

  updateEntity(updatedEntity: GameEntity): void {
    dataStore.dispatch(updateEntity(updatedEntity));
  }

  removeEntity(id: number): void {
    dataStore.dispatch(removeEntity(id));
  }
}

export default DataStoreService;
