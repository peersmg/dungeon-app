import View from "./Engine/View";
import Canvas from "./Engine/Canvas";
import Vector2D from "./Engine/Utils/Vector2D";
import ObjectManager from "../Game/Engine/ObjectManager";
import MovingBoxGO from "./Objects/MovingBoxGO";
import dataStore from "../reducers/store";
import { updateFps } from "../reducers/Actions";

class Game {
  canvas!: Canvas;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);
  deltaTimeHistory: number[] = [];

  begin(canvas: Canvas) {
    this.canvas = canvas;
    let y = 0;
    let x = 0;
    for (let i = 0; i < 5000; i++) {
      ObjectManager.getInstance().addObject(
        new MovingBoxGO(new Vector2D(x * 15, 100 + y * 15))
      );

      x++;
      if (x > 100) {
        y++;
        x = 0;
      }
    }
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
    while (
      this.deltaTimeHistory.length > 0 &&
      this.deltaTimeHistory[0] <= now - 1000
    ) {
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
