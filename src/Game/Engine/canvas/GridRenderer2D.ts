import Vector2D from "../Utils/Vector2D";
import dataStore from "../../../redux/store";
import Canvas2D from "./Canvas2D";

class GridRenderer2D {
  private _canvas: Canvas2D;

  constructor(canvas: Canvas2D) {
    this._canvas = canvas;
  }

  public drawBoxes() {
    let envArray = dataStore.getState().map.environment;

    for (let x = 0; x < envArray[0].length; x++) {
      for (let y = 0; y < envArray.length; y++) {
        let envType = dataStore
          .getState()
          .map.environmentTypes.find(val => val.id === envArray[y][x]);
        if (envType) {
          this._canvas.setFillStyle(envType.appearance2D.backgroundColor);
          this._canvas.drawBox(new Vector2D(x * 52, y * 52), new Vector2D(50, 50));
          this._canvas.drawTextToWorld(
            envType.appearance2D.character,
            new Vector2D(x * 52 + 25, y * 52 + 25),
            envType.appearance2D.textColor
          );
        }
      }
    }
  }

  public drawEntities() {
    let entityArray = dataStore.getState().map.entities;

    for (let i = 0; i < entityArray.length; i++) {
      this._canvas.setFillStyle(entityArray[i].appearance2D.backgroundColor);
      this._canvas.drawBox(
        new Vector2D(entityArray[i].mapCoord.x * 52, entityArray[i].mapCoord.y * 52),
        new Vector2D(50, 50)
      );
      this._canvas.drawTextToWorld(
        entityArray[i].appearance2D.character,
        new Vector2D(entityArray[i].mapCoord.x * 52 + 25, entityArray[i].mapCoord.y * 52 + 25),
        entityArray[i].appearance2D.textColor
      );
    }
  }
}

export default GridRenderer2D;
