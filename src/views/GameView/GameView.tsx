import React, { useEffect, useState } from "react";
import Game from "../../Game/Game";
import "./GameView.css";
import { GameStateProp, connectGameState } from "../../redux/types";
import ICanvas from "../../Game/Engine/canvas/ICanvas";
import Canvas2D from "../../Game/Engine/canvas/Canvas2D";
import Camera2D from "../../Game/Engine/camera/Camera2D";
import Canvas3D from "../../Game/Engine/canvas/Canvas3D";
import Camera3D from "../../Game/Engine/camera/Camera3D";

const GameView: React.FC<GameStateProp> = (props: GameStateProp) => {
  const [gameRef] = useState<Game>(new Game());
  const [requestFrame, setRequestFrame] = useState<number>(-1);
  const defaultCanvas = "2D";

  useEffect(() => {
    let canvasComponent: ICanvas;

    console.log("Setting up game...");

    if (defaultCanvas === "2D") {
      canvasComponent = new Canvas2D(new Camera2D());
      gameRef._canvasMode = "2D";
    } else {
      canvasComponent = new Canvas3D(new Camera3D());
      gameRef._canvasMode = "3D";
    }

    if (canvasComponent) {
      gameRef.begin(canvasComponent);
      document.addEventListener("keyup", (e: KeyboardEvent) => {
        keyPress(e);
      });

      setRequestFrame(requestAnimationFrame(updateGame));
    }

    return function cleanup() {
      cancelAnimationFrame(requestFrame);
      gameRef.stop();
    };
    // eslint-disable-next-line
  }, []);

  function updateGame() {
    gameRef.tick();

    requestAnimationFrame(updateGame);
  }

  function keyPress(e: KeyboardEvent) {
    if (e.keyCode === 32) {
      console.log("Space pressed!");
      if (gameRef._canvasMode === "2D") {
        gameRef.setCanvas(new Canvas3D(new Camera3D()), "3D");
      } else {
        console.log("Creating 2D canvas");
        gameRef.setCanvas(new Canvas2D(new Camera2D()), "2D");
      }
    }
  }

  return (
    <div className="game-view">
      <div className="game-header">
        <div className="game-fps">FPS: {props.state.gameStats.FPS}</div>
        <div className="game-health">Health: {props.state.map.entities[0]?.health}</div>
      </div>
      <div className="game-body" id="game"></div>
      <div className="game-footer">Author: Matthew</div>
    </div>
  );
};

export default connectGameState(GameView);
