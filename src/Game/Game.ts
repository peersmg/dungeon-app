import View from "./Objects/View";
import Canvas from "./components/Canvas/Canvas";
import Vector2D from "./Utils/Vector2D";

class Game {
  canvas!: Canvas;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);

  begin(canvas: Canvas) {
    this.canvas = canvas;
  }

  tick() {
    this.calcDeltatime();
    this.canvas.clearCanvas();
    this.canvas.drawBackgound("black");

    let fps = 1000 / this.deltaTime;
    this.canvas.drawText(
      "FPS: " + Math.round(fps * 100) / 100,
      new Vector2D({ x: this.canvas.getCanvasWidth() / 2, y: 0 })
    );

    this.canvas.drawBox(
      new Vector2D({ x: 100, y: 100 }),
      new Vector2D({ x: 500, y: 500 })
    );
  }

  private calcDeltatime() {
    let now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
  }
}

export default Game;
