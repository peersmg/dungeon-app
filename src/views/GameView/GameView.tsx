import React, { useEffect, useState } from "react";
import Canvas from "../../Game/components/Canvas/Canvas";
import Game from "../../Game/Game";

const GameView: React.FC = () => {
  const [gameRef] = useState<Game>(new Game());

  useEffect(() => {
    let canvasComponent = new Canvas();

    if (canvasComponent) {
      gameRef.begin(canvasComponent);
      requestAnimationFrame(updateGame);
    }
    // eslint-disable-next-line
  }, []);

  function updateGame() {
    gameRef.tick();

    requestAnimationFrame(updateGame);
  }

  return <div id="game" className="game"></div>;
};

export default GameView;
