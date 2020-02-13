import ICamera from "./ICamera";
import * as THREE from "three";
import Vector2D from "../Utils/Vector2D";
import TransformComponent from "../../components/TransformComponent";
import ICanvas from "../canvas/ICanvas";

class Camera3D implements ICamera {
  private _camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );

  constructor() {
    this._camera.position.z = 1;
    this._camera.rotateX(0.2);
  }

  update(canvas: ICanvas): void {}
  getViewPos(): Vector2D {
    //throw new Error("Method not implemented.");
    return new Vector2D(0, 0);
  }
  setFocus(focusTransform: TransformComponent): void {
    //throw new Error("Method not implemented.");
  }

  public get3DCamera() {
    return this._camera;
  }
}

export default Camera3D;
