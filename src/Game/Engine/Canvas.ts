import Vector2D from "./Utils/Vector2D";
import Box2D from "./Utils/Box2D";

class Canvas {
  private canvasCtx: CanvasRenderingContext2D | null = null;
  private dpr: number = 1;
  private userScale: number = 0;

  private containerElement: HTMLElement | null = null;

  private camera: Vector2D = new Vector2D(0, 0);
  private boxes: Box2D[] = [];

  constructor() {
    this.canvasCtx = this.generateCanvas();

    if (this.canvasCtx) {
      window.addEventListener("resize", () => {
        this.onDocumentResize();
      });
      window.addEventListener("orientationchange", () => {
        this.onDocumentResize();
      });
    }
  }

  render() {
    if (this.boxes) {
      this.boxes.forEach(box => {
        this.setFillStyle(box.color);
        this.drawBox(box.position, box.size);
      });
    }

    this.camera.add(new Vector2D(0.1, 0));
  }

  public addBox(newBox: Box2D | null) {
    if (newBox) {
      this.boxes.push(newBox);
    }
  }

  public removeBox(boxToRemove: Box2D | null) {
    if (boxToRemove) {
      let num = this.boxes.indexOf(boxToRemove);
      this.boxes.splice(num, 1);
    }
  }

  generateCanvas() {
    let canvasElement = document.createElement("canvas");

    if (canvasElement) {
      this.containerElement = document.getElementById("game");
      this.containerElement?.appendChild(canvasElement);
    }

    if (this.containerElement) {
      this.dpr = window.devicePixelRatio || 1;
      let xSize = this.containerElement?.clientWidth;
      let ySize = this.containerElement?.clientHeight;
      console.log("Pixel ratio: " + this.dpr);

      canvasElement.width = xSize * this.dpr;
      canvasElement.height = ySize * this.dpr;

      canvasElement.style.width = xSize + "px";
      canvasElement.style.height = ySize + "px";
    }

    let canvasCtx = canvasElement.getContext("2d");

    canvasCtx?.scale(this.dpr + this.userScale, this.dpr + this.userScale);

    return canvasCtx;
  }

  refreshCanvasSize() {
    if (this.canvasCtx && this.containerElement) {
      this.dpr = window.devicePixelRatio || 1;
      let xSize = this.containerElement.clientWidth;
      let ySize = this.containerElement.clientHeight;
      console.log("Pixel ratio: " + this.dpr);

      this.canvasCtx.canvas.width = xSize * this.dpr;
      this.canvasCtx.canvas.height = ySize * this.dpr;
      this.canvasCtx.canvas.style.width = xSize + "px";
      this.canvasCtx.canvas.style.height = ySize + "px";

      this.canvasCtx.scale(this.dpr + this.userScale, this.dpr + this.userScale);
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
      this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
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

  private drawBox(pos: Vector2D, size: Vector2D) {
    this.canvasCtx?.fillRect(pos.x - this.camera.x, pos.y - this.camera.y, size.x, size.y);
  }

  getContext() {
    return this.canvasCtx;
  }

  getCanvasWidth() {
    if (this.canvasCtx) {
      return window.innerWidth;
    } else {
      return 0;
    }
  }

  getCanvasHeight() {
    if (this.canvasCtx) {
      return window.innerHeight;
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
      this.canvasCtx.fillRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    }
  }
}

export default Canvas;
