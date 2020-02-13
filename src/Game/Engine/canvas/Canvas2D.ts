import Vector2D from "../Utils/Vector2D";
import Tile2D from "../Utils/Box2D";

import Camera2D from "../Utils/Camera2D";
import { Color } from "../Utils/Color";
import ICanvas from "./ICanvas";

class Canvas implements ICanvas {
  private _canvasCtx: CanvasRenderingContext2D | null = null;
  private dpr: number = 1;
  private userScale: number = 0;

  private containerElement: HTMLElement | null = null;

  //private camera: Vector2D = new Vector2D(0, 0);
  private _camera: Camera2D = new Camera2D();
  private boxes: Tile2D[] = [];

  constructor() {
    this._canvasCtx = this.generateCanvas();

    if (this.canvasCtx) {
      window.addEventListener("resize", () => {
        this.onDocumentResize();
      });
      window.addEventListener("orientationchange", () => {
        this.onDocumentResize();
      });
    }
  }

  public render() {
    this.clearCanvas();
    this.drawBackgound("black");

    this.drawBoxes();

    this._camera.update(this);
  }

  private drawBoxes() {
    if (this.boxes) {
      this.boxes.forEach(box => {
        this.setFillStyle(box.bgColor);
        this.drawBox(box.position, box.size);
        this.drawTextToWorld(
          box.char,
          box.position.clone().add(box.size.clone().divide(2)),
          box.txtColor
        );
      });
    }
  }

  public addTile(newBox: Tile2D | null) {
    if (newBox) {
      this.boxes.push(newBox);
    }
  }

  public removeTile(tileToRemove: Tile2D | null) {
    if (tileToRemove) {
      let num = this.boxes.indexOf(tileToRemove);
      this.boxes.splice(num, 1);
    }
  }

  private generateCanvas() {
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

  private refreshCanvasSize() {
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

  public setUserScale(scale: number) {
    this.userScale = scale;
    this.canvasCtx?.resetTransform();
    this.canvasCtx?.scale(scale, scale);
  }

  private onDocumentResize() {
    this.refreshCanvasSize();
  }

  private clearCanvas() {
    if (this.canvasCtx) {
      this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    }
  }

  private drawTextToWorld(text: string, pos: Vector2D, color: string = "white") {
    if (this.canvasCtx) {
      this.setFillStyle(color);
      this.setFont("bold 24px Arial");
      this.canvasCtx.textAlign = "center";
      this.canvasCtx.textBaseline = "middle";
      this.canvasCtx.fillText(text, pos.x - this._camera.viewPos.x, pos.y - this._camera.viewPos.y);
    }
  }

  private drawBox(pos: Vector2D, size: Vector2D) {
    this.canvasCtx?.fillRect(
      pos.x - this._camera.viewPos.x,
      pos.y - this._camera.viewPos.y,
      size.x,
      size.y
    );
  }

  private get canvasCtx() {
    return this._canvasCtx;
  }

  public getCanvasWidth() {
    if (this.containerElement) {
      return this.containerElement.clientWidth;
    } else {
      return 0;
    }
  }

  public getCanvasHeight() {
    if (this.containerElement) {
      return this.containerElement.clientHeight;
    } else {
      return 0;
    }
  }

  private setFont(font: string) {
    if (this.canvasCtx) {
      this.canvasCtx.font = font;
    }
  }

  private setFillStyle(fillStyle: string) {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = fillStyle;
    }
  }

  private drawBackgound(color: Color) {
    if (this.canvasCtx) {
      this.canvasCtx.fillStyle = color;
      this.canvasCtx.fillRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    }
  }

  public getCamera() {
    return this._camera;
  }
}

export default Canvas;
