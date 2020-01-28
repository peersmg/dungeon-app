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
    this.clearCanvas();
    this.canvas.drawBackgound("black");

    let fps = 1000 / this.deltaTime;
    this.canvas.drawText("Fps: " + Math.round(fps * 100) / 100, new Vector2D({ x: 5, y: 5 }));

    console.log(this.gameView.x);
  }

  private clearCanvas() {
    this.canvas.clearCanvas();
  }

  private calcDeltatime() {
    let now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
  }
}

export default Game;
