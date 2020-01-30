import View from "./Engine/View";
import Canvas from "./Engine/Canvas";
import Vector2D from "./Engine/Utils/Vector2D";
import ObjectManager from "../Game/Engine/ObjectManager";
import dataStore from "../reducers/store";
import { updateFps } from "../reducers/Actions";
import MapGO from "./Objects/MapGO";

class Game {
  canvas!: Canvas;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);
  deltaTimeHistory: number[] = [];

  begin(canvas: Canvas) {
    this.canvas = canvas;
    ObjectManager.getInstance().addObject(new MapGO(new Vector2D(100, 100)));
  }

  tick() {
    this.calcDeltatime();

    let fps = this.calcFps();

    dataStore.dispatch(updateFps(fps));

    this.canvas.clearCanvas();
    this.canvas.drawBackgound("black");

    ObjectManager.getInstance().updateAll(this.deltaTime);

    let curCanvasCtx = this.canvas.getContext();
    if (curCanvasCtx) {
      ObjectManager.getInstance().drawAll(curCanvasCtx);
    }
  }

  private calcFps() {
    const now = performance.now();
    while (this.deltaTimeHistory.length > 0 && this.deltaTimeHistory[0] <= now - 1000) {
      this.deltaTimeHistory.shift();
    }
    this.deltaTimeHistory.push(now);
    return this.deltaTimeHistory.length;
  }

  stop() {
    // Remove singletons
    ObjectManager.destroy();
  }

  private calcDeltatime() {
    let now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
  }
}

export default Game;
