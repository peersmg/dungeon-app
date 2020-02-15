import dataStore from "../../../redux/store";
import Canvas3D from "./Canvas3D";
import { GameEntity } from "../../../redux/types";
import { cloneDeep } from "lodash";

class GridRenderer3D {
  private _canvas: Canvas3D;
  private _entityMeshMap: Map<number, THREE.Mesh>;

  private _oldEntityState: GameEntity[] = [];
  private _initialised: boolean = false;
  private _boxSize: number = 1;

  constructor(canvas: Canvas3D) {
    this._canvas = canvas;
    this._entityMeshMap = new Map();
  }

  private initialiseEntityListner() {
    this._oldEntityState = dataStore.getState().map.entities;

    dataStore.subscribe(() => {
      this.handleChange();
    });

    this._initialised = true;
  }

  private handleChange() {
    let newState = cloneDeep(dataStore.getState().map.entities);

    if (newState !== this._oldEntityState) {
      // Check if entity removed
      this._oldEntityState.forEach(oldEnt => {
        if (!newState.find(newEnt => newEnt.objectId === oldEnt.objectId)) {
          // Old entity not in new entity list
          if (this._entityMeshMap.has(oldEnt.objectId)) {
            this._canvas.removeObject(this._entityMeshMap.get(oldEnt.objectId));
          }
        }
      });

      // Check if entity added
      newState.forEach(newEnt => {
        if (!this._oldEntityState.find(oldEnt => newEnt.objectId === oldEnt.objectId)) {
          // New entity not in old entity list
          if (!this._entityMeshMap.has(newEnt.objectId)) {
            // Add newEnt
            let newMesh = this._canvas.addCube(
              newEnt.mapCoord.x,
              newEnt.mapCoord.y,
              1,
              newEnt.appearance2D.backgroundColor,
              this._boxSize * 0.9
            );
            this._entityMeshMap.set(newEnt.objectId, newMesh);
          }
        }
      });

      // Check if entity position changed
      newState.forEach(newEnt => {
        if (
          this._oldEntityState.find(
            oldEnt => newEnt.objectId === oldEnt.objectId && newEnt.mapCoord !== oldEnt.mapCoord
          )
        ) {
          // Entity moved
          if (this._entityMeshMap.has(newEnt.objectId)) {
            // Add newEnt
            let meshToMove = this._entityMeshMap.get(newEnt.objectId)!;
            let newPos = this._canvas.gridToWorldPos(newEnt.mapCoord, 1);
            meshToMove.position.set(newPos.x, newPos.y, newPos.z);
          }
        }
      });
    }

    this._oldEntityState = newState;
  }

  public addEntities() {
    let entityArray = dataStore.getState().map.entities;

    for (let i = 0; i < entityArray.length; i++) {
      let newMesh = this._canvas.addCube(
        entityArray[i].mapCoord.x,
        entityArray[i].mapCoord.y,
        1,
        entityArray[i].appearance3D.baseColor,
        this._boxSize * 0.9
      );
      this._entityMeshMap.set(entityArray[i].objectId, newMesh);
    }

    if (!this._initialised) {
      this.initialiseEntityListner();
    }
  }

  public addEnvironment() {
    let envArray = dataStore.getState().map.environment;

    for (let x = 0; x < envArray[0].length; x++) {
      for (let y = 0; y < envArray.length; y++) {
        let envType = dataStore
          .getState()
          .map.environmentTypes.find(val => val.id === envArray[y][x]);

        if (envType) {
          this._canvas.addCube(
            x,
            y,
            envType.zLevel,
            envType.appearance3D.baseColor,
            this._boxSize,
            envType.zLevel === -1 ? false : true
          );
        }
      }
    }
  }
}

export default GridRenderer3D;
