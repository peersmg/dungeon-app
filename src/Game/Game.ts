import View from "./Engine/View";
import Vector2D from "./Engine/Utils/Vector2D";
import ObjectManager from "../Game/Engine/ObjectManager";
import dataStore from "../redux/store";
import MapGO from "./Objects/MapGO";
import InputManager from "./Engine/InputManager";
import PlayerGO from "./Objects/PlayerGO";
import DataStoreService from "./service/DataStoreService";
import { updateFps } from "../redux/actions/StatsActions";
import envTypesJson from "../assets/environment_types.json";
import { EnvironmentType } from "./TileTypes";
import { setEnvironmentTypes } from "../redux/actions/MapActions";
import EnemyGO from "./Objects/EnemyGO";
import ItemGO from "./Objects/ItemGO";
import ICanvas from "./Engine/canvas/ICanvas";

class Game {
  canvas: ICanvas | null = null;
  gameRunning: Boolean = true;
  lastUpdate: number = Date.now();
  deltaTime: number = 0;
  gameView: View = new View(0, 0);
  deltaTimeHistory: number[] = [];

  begin(canvas: ICanvas) {
    this.loadGame();

    this.canvas = canvas;
    ObjectManager.getInstance().canvas = canvas;

    // MAP
    ObjectManager.getInstance().addObject(new MapGO(new Vector2D(0, 0)));

    // PLAYER
    ObjectManager.getInstance().addObject(
      new PlayerGO(canvas, new DataStoreService(), new DataStoreService())
    );

    // ITEMS
    ObjectManager.getInstance().addObject(new ItemGO(new DataStoreService()));

    // ENEMIES
    ObjectManager.getInstance().addObject(new EnemyGO(new DataStoreService(), new Vector2D(1, 3)));
    ObjectManager.getInstance().addObject(new EnemyGO(new DataStoreService(), new Vector2D(7, 6)));
    ObjectManager.getInstance().addObject(new EnemyGO(new DataStoreService(), new Vector2D(15, 2)));
    ObjectManager.getInstance().addObject(new EnemyGO(new DataStoreService(), new Vector2D(2, 15)));
  }

  tick() {
    this.calcDeltatime();

    let fps = this.calcFps();

    dataStore.dispatch(updateFps(fps));

    this.canvas?.render();
    ObjectManager.getInstance().updateAll(this.deltaTime);
  }

  private loadGame() {
    let loadedEnvTypes: EnvironmentType[] = envTypesJson as EnvironmentType[];
    dataStore.dispatch(setEnvironmentTypes(loadedEnvTypes));
  }

  stop() {
    // Remove singletons
    ObjectManager.destroy();
    InputManager.destroy();
  }

  private calcDeltatime() {
    let now = Date.now();
    this.deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
  }
  private calcFps() {
    const now = performance.now();
    while (this.deltaTimeHistory.length > 0 && this.deltaTimeHistory[0] <= now - 1000) {
      this.deltaTimeHistory.shift();
    }
    this.deltaTimeHistory.push(now);
    return this.deltaTimeHistory.length;
  }
}

export default Game;
