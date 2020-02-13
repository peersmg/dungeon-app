import ICanvas from "./ICanvas";
import Tile2D from "../Utils/Tile2D";
import ICamera from "../camera/ICamera";
import * as THREE from "three";
import Camera3D from "../camera/Camera3D";

class Canvas3D implements ICanvas {
  private _camera: ICamera;
  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _containerElement: HTMLElement | null;

  constructor(camera: ICamera) {
    this._camera = camera;
    this._scene = new THREE.Scene();

    this._containerElement = document.getElementById("game");

    this._renderer = new THREE.WebGLRenderer({ antialias: true });

    if (this._containerElement) {
      this._renderer.setSize(
        this._containerElement.clientWidth,
        this._containerElement.clientHeight
      );

      this._containerElement?.appendChild(this._renderer.domElement);
    }
  }

  render(): void {
    this._renderer.render(this._scene, (this._camera as Camera3D).get3DCamera());
  }

  addTile(newBox: Tile2D | null): void {
    if (newBox) {
      let geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
      let material = new THREE.MeshNormalMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (newBox.position.x / 52) * 0.05,
        -(newBox.position.y / 52) * 0.05,
        newBox.zLevel * 0.05
      );
      this._scene.add(mesh);
    }
  }
  removeTile(tileToRemove: Tile2D | null): void {
    //throw new Error("Method not implemented.");
  }
  getCanvasWidth(): number {
    //throw new Error("Method not implemented.");
    return 0;
  }
  getCanvasHeight(): number {
    //throw new Error("Method not implemented.");
    return 0;
  }
  getCamera(): ICamera {
    // throw new Error("Method not implemented.");
    return this._camera;
  }
}

export default Canvas3D;
