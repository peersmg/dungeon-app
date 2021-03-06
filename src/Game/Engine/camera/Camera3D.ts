import ICamera from "./ICamera";
import * as THREE from "three";
import Vector2D from "../Utils/Vector2D";
import TransformComponent from "../../components/TransformComponent";
import ICanvas from "../canvas/ICanvas";
import Canvas3D from "../canvas/Canvas3D";

class Camera3D implements ICamera {
  private _camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.0001,
    50
  );
  private focusTransform: TransformComponent | null = null;
  private moveSpeed = 0.5;
  private cameraOffset = -5;
  private _initialised = false;

  constructor() {
    this._camera.position.z = 10;
    this._camera.rotateX(0.5);
  }

  update(canvas: ICanvas): void {
    if (this.focusTransform) {
      let targetPos = (canvas as Canvas3D).gridToWorldPos(
        this.focusTransform.position.clone().divide(52),
        1
      );

      targetPos.setY(targetPos.y + this.cameraOffset);

      let curPos = this._camera.position;
      let directionVec = curPos
        .clone()
        .sub(targetPos)
        .setLength(1)
        .negate();
      let updatedVec = new Vector2D(
        curPos.x + directionVec.x * this.moveSpeed,
        curPos.y + directionVec.y * this.moveSpeed
      );

      if (!this._initialised) {
        this._camera.position.setX(targetPos.x);
        this._camera.position.setY(targetPos.y);
        this._initialised = true;
      } else {
        this._camera.position.setX(updatedVec.x);
        this._camera.position.setY(updatedVec.y);
      }
    }
  }

  updateCameraSize(width: number, height: number) {
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }

  getViewPos(): Vector2D {
    //throw new Error("Method not implemented.");this._camera.position
    return new Vector2D(this._camera.position.x, this._camera.position.y);
  }

  setFocus(focusTransform: TransformComponent): void {
    this.focusTransform = focusTransform;
  }

  public get3DCamera() {
    return this._camera;
  }
}

export default Camera3D;
