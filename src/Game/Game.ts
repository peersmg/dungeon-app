import View from "./Engine/View";
import Canvas from "./Engine/Canvas";
import Vector2D from "./Engine/Utils/Vector2D";
import ObjectManager from "../Game/Engine/ObjectManager";
import MovingBoxGO from "./Objects/MovingBoxGO";

class Game {
  canvas!: Canvas;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);

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
    this.canvas.clearCanvas();
    this.canvas.drawBackgound("black");

    ObjectManager.getInstance().updateAll(this.deltaTime);

    let curCanvasCtx = this.canvas.getContext();
    if (curCanvasCtx) {
      ObjectManager.getInstance().drawAll(curCanvasCtx);
    }

    let fps = 1000 / this.deltaTime;
    this.canvas.drawText(
      "FPS: " + Math.round(fps * 100) / 100,
      new Vector2D(this.canvas.getCanvasWidth() / 2, 0)
    );
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
