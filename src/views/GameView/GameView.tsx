import React, { useEffect, useState } from "react";
import Canvas from "../../Game/Engine/Canvas";
import Game from "../../Game/Game";
import "./GameView.css";

const GameView: React.FC = () => {
  const [gameRef] = useState<Game>(new Game());
  const [requestFrame, setRequestFrame] = useState<number>(-1);

  useEffect(() => {
    let canvasComponent = new Canvas();

    if (canvasComponent) {
      gameRef.begin(canvasComponent);
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

  return (
    <div className="game-view">
      <div className="game-header">Dungeon Game!</div>
      <div className="game-body" id="game"></div>
      <div className="game-footer">Author: Matthew</div>
    </div>
  );
};

export default GameView;
