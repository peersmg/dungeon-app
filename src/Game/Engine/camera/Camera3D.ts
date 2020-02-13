import ICamera from "./ICamera";
import * as THREE from "three";
import Vector2D from "../Utils/Vector2D";
import TransformComponent from "../../components/TransformComponent";

class Camera3D implements ICamera {
  private _camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );

  constructor() {
    this._camera.position.z = 1;
  }

  update(canvas: import("../canvas/ICanvas").default): void {}
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
