import ICanvas from "./ICanvas";
import ICamera from "../camera/ICamera";
import * as THREE from "three";
import Camera3D from "../camera/Camera3D";
import dataStore from "../../../redux/store";

class Canvas3D implements ICanvas {
  private _camera: ICamera;
  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _containerElement: HTMLElement | null;
  private _initialised: boolean = false;

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
    if (!this._initialised) {
      // Add environment
      this.addEnvironment();

      // Add entities
      this.addEntities();

      this._initialised = true;
    }

    this._renderer.render(this._scene, (this._camera as Camera3D).get3DCamera());
  }

  private addEntities() {
    let entityArray = dataStore.getState().map.entities;
    console.log("Adding entities:");
    for (let i = 0; i < entityArray.length; i++) {
      console.log("Adding entity");
      this.addCube(entityArray[i].mapCoord.x, entityArray[i].mapCoord.y, 1);
    }
  }

  private addEnvironment() {
    let envArray = dataStore.getState().map.environment;

    for (let x = 0; x < envArray[0].length; x++) {
      for (let y = 0; y < envArray.length; y++) {
        let envType = dataStore
          .getState()
          .map.environmentTypes.find(val => val.id === envArray[y][x]);

        if (envType) {
          this.addCube(x, y, envType.zLevel);
        }
      }
    }
  }

  private addCube(x: number, y: number, zLevel: number) {
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
