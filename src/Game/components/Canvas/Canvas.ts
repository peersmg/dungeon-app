import Vector2D from "../../Utils/Vector2D";

class Canvas {
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private dpr: number = 1;
  private userScale: number = 1;

  constructor() {
    this.canvasCtx = this.generateCanvas();

    if (this.canvasCtx) {
      window.addEventListener("resize", () => {
        this.onDocumentResize();
      });
    }
  }

  generateCanvas() {
    let canvasElement = document.createElement("canvas");

    if (canvasElement) {
      document.getElementById("game")?.appendChild(canvasElement);
      this.refreshCanvasStyling();
    }

    this.dpr = window.devicePixelRatio || 1;
    let xSize = window.innerWidth;
    let ySize = window.innerHeight;
    console.log("Pixel ratio: " + this.dpr);

    canvasElement.width = xSize * this.dpr;
    canvasElement.height = ySize * this.dpr;

    let canvasCtx = canvasElement.getContext("2d");

    canvasCtx?.scale(this.userScale, this.userScale);

    return canvasCtx;
  }

  refreshCanvasSize() {
    if (this.canvasCtx) {
      this.dpr = window.devicePixelRatio || 1;
      let xSize = window.innerWidth;
      let ySize = window.innerHeight;
      console.log("Pixel ratio: " + this.dpr);

      this.canvasCtx.canvas.width = xSize * this.dpr;
      this.canvasCtx.canvas.height = ySize * this.dpr;

      this.canvasCtx.scale(this.userScale, this.userScale);
    }
  }

  setUserScale(scale: number) {
    this.userScale = scale;
    this.canvasCtx?.resetTransform();
    this.canvasCtx?.scale(scale, scale);
  }

  onDocumentResize() {
    this.refreshCanvasSize();
  }

  clearCanvas() {
    if (this.canvasCtx) {
      this.canvasCtx.clearRect(
        0,
        0,
        this.canvasCtx.canvas.width,
        this.canvasCtx.canvas.height
      );
    }
  }

  drawText(text: string, pos: Vector2D, color: string = "white") {
    if (this.canvasCtx) {
      this.setFillStyle(color);
      this.setFont("bold 24px Arial");
      this.canvasCtx.textAlign = "start";
      this.canvasCtx.textBaseline = "top";
      this.canvasCtx.fillText(text, pos.x, pos.y);
    }
  }

  drawBox(pos: Vector2D, size: Vector2D) {
    this.canvasCtx?.fillRect(pos.x, pos.y, size.x, size.y);
  }

  getCanvasWidth() {
    if (this.canvasCtx) {
      return window.innerWidth / this.userScale;
    } else {
      return 0;
    }
  }

  getCanvasHeight() {
    if (this.canvasCtx) {
      return window.innerHeight / this.userScale;
    } else {
      return 0;
    }
  }

  setFont(font: string) {
    if (this.canvasCtx) {
      this.canvasCtx.font = font;
    }
  }

  setFillStyle(fillStyle: string) {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = fillStyle;
    }
  }

  drawBackgound(color: string) {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = color;
      this.canvasCtx.fillRect(
        0,
        0,
        this.canvasCtx.canvas.width,
        this.canvasCtx.canvas.height
      );
    }
  }

  private refreshCanvasStyling() {
    if (this.canvasCtx) {
      this.canvasCtx.canvas.style.position = "absolute";

      this.canvasCtx.canvas.style.left = "0px";
      this.canvasCtx.canvas.style.top = "0px";
      this.canvasCtx.canvas.style.padding = "0px";
    }
  }
}

export default Canvas;
