import { IEntityStore } from "./IEntityStore";
import { IMapStore } from "./IMapStore";
import { GameEntity } from "../../redux/types";
import dataStore from "../../redux/store";
import { addEntity, updateEntity, removeEntity, setMap } from "../../redux/actions/MapActions";
import { Environment, EnvironmentType } from "../TileTypes";
import Vector2D from "../Engine/Utils/Vector2D";
import { isNullOrUndefined } from "util";

class DataStoreService implements IEntityStore, IMapStore {
  getAdjacentEntities(mapLocation: Vector2D): GameEntity[] | null {
    let adjEntity: GameEntity[] = [];
    dataStore.getState().map.entities.forEach(val => {
      if (
        (mapLocation.x + 1 === val.mapCoord.x && mapLocation.y === val.mapCoord.y) ||
        (mapLocation.x - 1 === val.mapCoord.x && mapLocation.y === val.mapCoord.y) ||
        (mapLocation.y + 1 === val.mapCoord.y && mapLocation.x === val.mapCoord.x) ||
        (mapLocation.y - 1 === val.mapCoord.y && mapLocation.x === val.mapCoord.x)
      ) {
        console.log("Adjacent!");
        adjEntity.push(val);
      }
    });

    return adjEntity;
  }

  getEntitiesAtLocation(mapLocation: Vector2D) {
    let entity = dataStore.getState().map.entities.filter(val => val.mapCoord.equals(mapLocation));

    return entity.length > 0 ? entity : null;
  }

  getEntities(): GameEntity[] | null {
    return dataStore.getState().map.entities;
  }
  getEnvironmentType(id: number): EnvironmentType | null {
    let mapTypes: EnvironmentType[] = dataStore.getState().map.environmentTypes;

    let envType = mapTypes.find(val => val.id === id);

    if (!isNullOrUndefined(envType)) {
      return envType;
    } else {
      return null;
    }
  }

  getEnvironmentOf(mapPosition: Vector2D): EnvironmentType | null {
    let mapTypes: EnvironmentType[] = dataStore.getState().map.environmentTypes;
    let envType = null;

    if (
      !isNullOrUndefined(this.getMap()) &&
      !isNullOrUndefined(this.getMap()![mapPosition.x]) &&
      !isNullOrUndefined(this.getMap()![mapPosition.x][mapPosition.y])
    ) {
      envType = mapTypes.find(val => val.id === this.getMap()![mapPosition.x][mapPosition.y]);
    }

    if (!isNullOrUndefined(envType)) {
      return envType;
    } else {
      return null;
    }
  }

  setMap(newMap: Environment[][]): void {
    dataStore.dispatch(setMap(newMap));
  }
  getMap(): Environment[][] | null {
    let environment = dataStore.getState().map.environment;
    if (environment) {
      return environment;
    } else {
      return environment;
    }
  }

  addEntity(newEntity: GameEntity): void {
    dataStore.dispatch(addEntity(newEntity));
  }

  getEntity(id: number | null): GameEntity | null {
    let entity = dataStore.getState().map.entities.find(obj => obj.objectId === id);

    if (!isNullOrUndefined(entity)) {
      return entity;
    } else {
      return null;
    }
  }

  updateEntity(updatedEntity: GameEntity | null): void {
    if (!isNullOrUndefined(updatedEntity)) {
      dataStore.dispatch(updateEntity(updatedEntity));
    }
  }

  removeEntity(id: number): void {
    dataStore.dispatch(removeEntity(id));
  }
}

export default DataStoreService;
