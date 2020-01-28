import View from "./Objects/View";

class Game {
  canvasCtx!: CanvasRenderingContext2D;
  canvasElement!: HTMLCanvasElement;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);

  begin(canvasCtx: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) {
    this.canvasCtx = canvasCtx;
    this.canvasElement = canvasElement;

    this.canvasElement.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keyPressed(e);
    });
  }

  tick() {
    this.calcDeltatime();
    this.clearCanvas();

    this.canvasCtx.fillStyle = "black";
    this.canvasCtx.font = "bold 16px Arial";

    let fillTextX = this.canvasElement.width / 2 - this.gameView.x;
    let fillTextY = this.canvasElement.height / 2 + this.gameView.y;
    this.canvasCtx.fillText(
      "Fps: " + (1000 / this.deltaTime).toString(),
      fillTextX,
      fillTextY
    );

    console.log(this.gameView.x);
  }

  private clearCanvas() {
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  }

  private calcDeltatime() {
    let now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
  }

  private keyPressed(e: KeyboardEvent) {
    if (e.key == "w") {
      this.gameView.y += 0.5 * this.deltaTime;
    }
    if (e.key == "s") {
      this.gameView.y -= 0.5 * this.deltaTime;
    }
    if (e.key == "d") {
      this.gameView.x += 0.5 * this.deltaTime;
    }
    if (e.key == "a") {
      this.gameView.x -= 0.5 * this.deltaTime;
    }
  }
}

export default Game;
