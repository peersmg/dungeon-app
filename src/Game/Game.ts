import View from "./Objects/View";
import Canvas from "./components/Canvas/Canvas";

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

    this.canvas.setFillStyle("black");
    this.canvas.setFont("bold 16px Arial");

    this.canvas.drawText("Fps: " + 1000 / this.deltaTime, 5, 5);

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
