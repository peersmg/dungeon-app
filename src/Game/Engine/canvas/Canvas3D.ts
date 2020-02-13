import ICanvas from "./ICanvas";
import Tile2D from "../Utils/Tile2D";
import ICamera from "../camera/ICamera";
import * as THREE from "three";

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
    //throw new Error("Method not implemented.");
  }
  addTile(newBox: Tile2D | null): void {
    //throw new Error("Method not implemented.");
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
