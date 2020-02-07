import Vector2D from "./Vector2D";
import Canvas from "../Canvas";
import TransformComponent from "../components/TransformComponent";
import lUtil from "lodash";

class Camera2D {
  private _viewPos = new Vector2D(0, 0);
  private focusTransform: TransformComponent | null = null;

  public get viewPos() {
    return this._viewPos;
  }

  public update(canvas: Canvas) {
    if (this.focusTransform && canvas.getContext()) {
      this.updateFocus(canvas.getContext()!);
    }
  }

  private updateFocus(canvasCtx: CanvasRenderingContext2D) {
    let focusCanvasPosX = this.focusTransform!.position.x - this.viewPos.x;
    let focusCanvasPosY = this.focusTransform!.position.y - this.viewPos.y;

    let upperLimitX = canvasCtx.canvas.width * 0.8;
    let lowerLimitX = canvasCtx.canvas.width * 0.2;
    let upperLimitY = canvasCtx.canvas.height * 0.8;
    let lowerLimitY = canvasCtx.canvas.height * 0.2;

    if (focusCanvasPosX > upperLimitX || focusCanvasPosX < lowerLimitX) {
      this.snapToFocusX(canvasCtx);
    }
    if (focusCanvasPosY > upperLimitY || focusCanvasPosY < lowerLimitY) {
      this.snapToFocusY(canvasCtx);
    }
  }

  private snapToFocusX(canvasCtx: CanvasRenderingContext2D) {
    let canvasWidth = canvasCtx.canvas.width;

    let minX = 0;
    let maxX = 10000;

    let camX = lUtil.clamp(this.focusTransform!.position.x - canvasWidth / 2, minX, maxX);

    this._viewPos = new Vector2D(camX, this.viewPos.y);
  }

  private snapToFocusY(canvasCtx: CanvasRenderingContext2D) {
    let canvasHeight = canvasCtx.canvas.height;

    let minY = 0;
    let maxY = 10000;

    let camY = lUtil.clamp(this.focusTransform!.position.y - canvasHeight / 2, minY, maxY);

    this._viewPos = new Vector2D(this.viewPos.x, camY);
  }

  public setFocus(focusTransform: TransformComponent) {
    this.focusTransform = focusTransform;
  }
}

export default Camera2D;
