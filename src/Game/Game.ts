class Game {
  canvasCtx!: CanvasRenderingContext2D;
  canvasElement!: HTMLCanvasElement;
  gameRunning: Boolean = true;
  xNum: number = 0;
  lastUpdate: number = Date.now();

  begin(canvasCtx: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) {
    this.canvasCtx = canvasCtx;
    this.canvasElement = canvasElement;
    console.log("Begin");
  }

  tick() {
    let now = Date.now();
    let deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    this.canvasCtx.fillStyle = "black";
    this.canvasCtx.font = "bold 16px Arial";
    this.canvasCtx.fillText("Fps: " + (1000 / deltaTime).toString(), 100, 100);

    this.xNum++;
    this.canvasCtx.fillRect(this.xNum, 0, 10, 10);
  }
}

export default Game;
