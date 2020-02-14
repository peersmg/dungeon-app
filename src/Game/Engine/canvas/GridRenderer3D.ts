import dataStore from "../../../redux/store";
import Canvas3D from "./Canvas3D";

class GridRenderer3D {
  private _canvas: Canvas3D;

  constructor(canvas: Canvas3D) {
    this._canvas = canvas;
  }

  public addEntities() {
    let entityArray = dataStore.getState().map.entities;

    for (let i = 0; i < entityArray.length; i++) {
      this._canvas.addCube(entityArray[i].mapCoord.x, entityArray[i].mapCoord.y, 1);
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
          this._canvas.addCube(x, y, envType.zLevel);
        }
      }
    }
  }
}

export default GridRenderer3D;
