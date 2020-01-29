import View from "./Engine/View";
import Canvas from "./Engine/Canvas";
import Vector2D from "./Utils/Vector2D";
import ObjectManager from "../Game/Engine/ObjectManager";
import MovingBoxGO from "./Objects/MovingBoxGO";
import TransformComponent from "./components/TransformComponent";

class Game {
  canvas!: Canvas;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);

  begin(canvas: Canvas) {
    this.canvas = canvas;
    ObjectManager.getInstance().addObject(
      new MovingBoxGO(new Vector2D(100, 100))
    );

    ObjectManager.getInstance().addObject(
      new MovingBoxGO(new Vector2D(300, 100))
    );

    ObjectManager.getInstance().addObject(
      new MovingBoxGO(new Vector2D(700, 100))
    );
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

  private calcDeltatime() {
    let now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
  }
}

export default Game;
