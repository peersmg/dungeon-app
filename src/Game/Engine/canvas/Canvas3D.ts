import ICanvas from "./ICanvas";
import ICamera from "../camera/ICamera";
import * as THREE from "three";
import Camera3D from "../camera/Camera3D";
import dataStore from "../../../redux/store";
import GridRenderer3D from "./GridRenderer3D";

class Canvas3D implements ICanvas {
  private _camera: ICamera;
  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _containerElement: HTMLElement | null;
  private _initialised: boolean = false;
  private _gridRender: GridRenderer3D;

  constructor(camera: ICamera) {
    this._camera = camera;
    this._scene = new THREE.Scene();

    this._containerElement = document.getElementById("game");

    this._renderer = new THREE.WebGLRenderer({ antialias: true });

    this._gridRender = new GridRenderer3D(this);

    if (this._containerElement) {
      this._renderer.setSize(
        this._containerElement.clientWidth,
        this._containerElement.clientHeight
      );

      this._containerElement?.appendChild(this._renderer.domElement);
    }
  }

  render(): void {
    if (!this._initialised) {
      // Add environment
      this._gridRender.addEnvironment();

      // Add entities
      this._gridRender.addEntities();

      this._initialised = true;
    }

    this._renderer.render(this._scene, (this._camera as Camera3D).get3DCamera());
  }

  public addCube(x: number, y: number, zLevel: number) {
    let xOffset = -1;
    let yOffset = 0.5;
    let boxSize = 0.05;

    let geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x * boxSize + xOffset, -y * boxSize + yOffset, zLevel * boxSize);
    this._scene.add(mesh);
  }

  getCanvasWidth(): number {
    if (this._containerElement) {
      return this._containerElement.clientWidth;
    } else {
      return 0;
    }
  }

  getCanvasHeight(): number {
    if (this._containerElement) {
      return this._containerElement.clientHeight;
    } else {
      return 0;
    }
  }

  getCamera(): ICamera {
    return this._camera;
  }
}

export default Canvas3D;
