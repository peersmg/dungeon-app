import ICanvas from "./ICanvas";
import ICamera from "../camera/ICamera";
import * as THREE from "three";
import Camera3D from "../camera/Camera3D";
import GridRenderer3D from "./GridRenderer3D";
import Vector2D from "../Utils/Vector2D";
import { isNullOrUndefined } from "util";
import { Color } from "../Utils/Color";

class Canvas3D implements ICanvas {
  private _camera: ICamera;
  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _containerElement: HTMLElement | null;
  private _initialised: boolean = false;
  private _gridRender: GridRenderer3D;

  private _xOffset = -1;
  private _yOffset = 0.5;
  private _boxSize = 0.05;

  constructor(camera: ICamera) {
    this._camera = camera;
    this._scene = new THREE.Scene();

    this._containerElement = document.getElementById("game");

    this._renderer = new THREE.WebGLRenderer({ antialias: true });

    this._gridRender = new GridRenderer3D(this);

    let ambientLight = new THREE.AmbientLight(0x404040);
    this._scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.z = 2;
    directionalLight.position.y = 0.5;
    directionalLight.position.x = 3;
    this._scene.add(directionalLight);

    if (this._containerElement) {
      this._renderer.setSize(
        this._containerElement.clientWidth,
        this._containerElement.clientHeight
      );

      this._containerElement?.appendChild(this._renderer.domElement);
    }

    window.addEventListener("resize", () => {
      this.onDocumentResize();
    });
    window.addEventListener("orientationchange", () => {
      this.onDocumentResize();
    });
  }

  private onDocumentResize() {
    if (this._containerElement) {
      this._renderer.domElement.width = this._containerElement.clientWidth;
      this._renderer.domElement.height = this._containerElement.clientHeight;

      (this._camera as Camera3D).updateCameraSize(
        this._containerElement.clientWidth,
        this._containerElement.clientHeight
      );

      this._renderer.setSize(
        this._containerElement.clientWidth,
        this._containerElement.clientHeight
      );
    }
  }

  remove(): void {
    this._renderer.domElement.remove();
  }

  render(): void {
    if (!this._initialised) {
      // Add environment
      this._gridRender.addEnvironment();

      // Add entities
      this._gridRender.addEntities();

      this._initialised = true;
    }

    this._camera.update(this);
    this._renderer.render(this._scene, (this._camera as Camera3D).get3DCamera());
  }

  public addCube(x: number, y: number, zLevel: number, color: Color, boxSize: number): THREE.Mesh {
    let geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    let material = new THREE.MeshPhongMaterial({ color: new THREE.Color(color) });
    let mesh = new THREE.Mesh(geometry, material);

    let pos = this.gridToWorldPos(new Vector2D(x, y), zLevel);
    mesh.position.set(pos.x, pos.y, pos.z);
    this._scene.add(mesh);

    return mesh;
  }

  public removeObject(objectToRemove: THREE.Object3D | null | undefined) {
    if (!isNullOrUndefined(objectToRemove)) {
      this._scene.remove(objectToRemove);
    }
  }

  public gridToWorldPos(gridPos: Vector2D, zLevel: number): THREE.Vector3 {
    return new THREE.Vector3(
      gridPos.x * this._boxSize + this._xOffset,
      -gridPos.y * this._boxSize + this._yOffset,
      zLevel * this._boxSize
    );
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
