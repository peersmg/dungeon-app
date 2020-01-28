import Vector2D from "../../Utils/Vector2D";

class Canvas {
  private canvasElement: HTMLCanvasElement | null = null;
  private canvasCtx: CanvasRenderingContext2D | null = null;

  constructor() {
    this.canvasElement = document.createElement("canvas");

    if (this.canvasElement) {
      document.getElementById("game")?.appendChild(this.canvasElement);

      this.canvasCtx = this.canvasElement.getContext("2d");

      this.refreshCanvasStyling();

      window.addEventListener("resize", () => {
        this.onDocumentResize();
      });
    }
  }

  onDocumentResize() {
    this.refreshCanvasStyling();
  }

  clearCanvas() {
    if (this.canvasElement) {
      this.canvasCtx?.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
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

  getCanvasWidth() {
    if (this.canvasElement) {
      return this.canvasElement.width;
    } else {
      return 0;
    }
  }

  getCanvasHeight() {
    if (this.canvasElement) {
      return this.canvasElement.height;
    } else {
      return 0;
    }
  }

  getElement() {
    return this.canvasElement;
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
    if (this.canvasCtx && this.canvasElement) {
      this.canvasCtx.fillStyle = color;
      this.canvasCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }

  private refreshCanvasStyling() {
    if (this.canvasElement) {
      this.canvasElement.style.position = "absolute";

      this.canvasElement.style.left = "0px";
      this.canvasElement.style.top = "0px";
      this.canvasElement.style.padding = "0px";
      this.canvasElement.width = window.innerWidth;
      this.canvasElement.height = window.innerHeight;
    }
  }
}

export default Canvas;
