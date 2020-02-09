import Vector2D from "./Vector2D";
import Canvas from "../Canvas";
import TransformComponent from "../../components/TransformComponent";
import lUtil from "lodash";

class Camera2D {
  private _viewPos = new Vector2D(0, 0);
  private targetViewPos = new Vector2D(0, 0);
  private focusTransform: TransformComponent | null = null;

  private moveSpeed = 0.1;

  public get viewPos() {
    return this._viewPos;
  }

  public update(canvas: Canvas) {
    if (this.focusTransform && canvas.canvasCtx) {
      this.updateFocus(canvas);
    }

    if (this._viewPos !== this.targetViewPos) {
      let directionVec = this.targetViewPos.clone().subtract(this._viewPos);
      this._viewPos.add(directionVec.multiply(this.moveSpeed));
    }
  }

  private updateFocus(canvas: Canvas) {
    let focusCanvasPosX = this.focusTransform!.position.x - this.viewPos.x;
    let focusCanvasPosY = this.focusTransform!.position.y - this.viewPos.y;

    let upperLimitX = canvas.getCanvasWidth() * 0.8;
    let lowerLimitX = canvas.getCanvasWidth() * 0.2;
    let upperLimitY = canvas.getCanvasHeight() * 0.8;
    let lowerLimitY = canvas.getCanvasHeight() * 0.2;

    if (focusCanvasPosX > upperLimitX || focusCanvasPosX < lowerLimitX) {
      this.snapToFocusX(canvas);
    }
    if (focusCanvasPosY > upperLimitY || focusCanvasPosY < lowerLimitY) {
      this.snapToFocusY(canvas);
    }
  }

  private snapToFocusX(canvas: Canvas) {
    let canvasWidth = canvas.getCanvasWidth();

    let minX = 0;
    let maxX = 10000;

    let camX = lUtil.clamp(this.focusTransform!.position.x - canvasWidth / 2, minX, maxX);

    this.targetViewPos = new Vector2D(camX, this.targetViewPos.y);
  }

  private snapToFocusY(canvas: Canvas) {
    let canvasHeight = canvas.getCanvasHeight();

    let minY = 0;
    let maxY = 10000;

    let camY = lUtil.clamp(this.focusTransform!.position.y - canvasHeight / 2, minY, maxY);

    this.targetViewPos = new Vector2D(this.targetViewPos.x, camY);
  }

  public setFocus(focusTransform: TransformComponent) {
    this.focusTransform = focusTransform;
  }
}

export default Camera2D;
