import React, { useEffect, useRef, useState } from "react";
import Game from "../../Game/Game";

const GameView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRef, setGameRef] = useState<Game>(new Game());

  let canvasCtx: CanvasRenderingContext2D | null = null;
  let canvasElement: HTMLCanvasElement | null = null;

  useEffect(() => {
    setupCanvas();

    if (canvasCtx && canvasElement) {
      gameRef.begin(canvasCtx, canvasElement);
      requestAnimationFrame(updateGame);
    }
  }, []);

  function updateGame() {
    gameRef.tick();

    requestAnimationFrame(updateGame);
  }

  function setupCanvas() {
    if (canvasRef.current) {
      canvasElement = canvasRef.current;
      canvasCtx = canvasElement.getContext("2d");
      setupCanvasStyling(canvasElement);
    }
  }

  function setupCanvasStyling(canvasElement: HTMLCanvasElement) {
    canvasElement.style.position = "absolute";

    canvasElement.style.left = "0px";
    canvasElement.style.top = "0px";
    canvasElement.style.padding = "0px";
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  }

  return (
    <div className="game">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GameView;
