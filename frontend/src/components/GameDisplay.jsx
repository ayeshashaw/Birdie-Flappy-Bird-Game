import { useState, useRef, useCallback, useEffect } from "react";
import Bird from "./Bird";
import Pipe from "./Pipe";
import Ground from "./Ground";
import apis from "../utils/apis";
import httpAction from "../utils/httpActions";

// Game constants
const GRAVITY = 0.4;
const JUMP_FORCE = -7;
const PIPE_SPEED = 2;
const PIPE_GAP = 150;
const PIPE_WIDTH = 80;
const BIRD_SIZE = 40;
const GAME_AREA_HEIGHT = 600;
const GAME_AREA_WIDTH = 400;
const GROUND_HEIGHT = 100;

const GAME_STATES = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  GAME_OVER: "GAME_OVER",
};

let bgAudio;

const playbg = () => {
  if (!bgAudio) {
    bgAudio = new Audio("/bg.mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
  }
  bgAudio.play().catch(e => console.log("Audio play failed:", e));
};

const stopbg = () => {
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  }
};

const playjump = () => new Audio("/jump.mp3").play().catch(() => {});
const playpoint = () => new Audio("/point.mp3").play().catch(() => {});
const playdie = () => new Audio("/die1.mp3").play().catch(() => {});

function GameDisplay() {
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(GAME_AREA_HEIGHT / 2 - 100);
  const [pipes, setPipes] = useState([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showHighScoreMessage, setShowHighScoreMessage] = useState(false);

  const gameAreaRef = useRef(null);
  const animationFrameId = useRef(null);
  const velocity = useRef(0);
  const groundPosition = useRef(0);
  const scoreRef = useRef(0);
  const previousHighScore = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const fetchHighestScore = useCallback(async () => {
    try {
      const data = { url: apis().getUserHighestScore, method: "GET" };
      const result = await httpAction(data);
      if (result?.success) {
        previousHighScore.current = result.highestScore || 0;
        setHighScore(result.highestScore);
      }
    } catch (error) {
      console.error("❌ Error fetching highest score:", error);
    }
  }, []);

  useEffect(() => {
    fetchHighestScore();
  }, [fetchHighestScore]);

  const generatePipe = useCallback(() => {
    const gapPosition = Math.random() * (GAME_AREA_HEIGHT - PIPE_GAP - GROUND_HEIGHT - 150) + 100;
    return {
      id: Date.now() + Math.random(),
      x: GAME_AREA_WIDTH,
      topHeight: gapPosition,
      bottomHeight: GAME_AREA_HEIGHT - gapPosition - PIPE_GAP - GROUND_HEIGHT,
      passed: false,
    };
  }, []);

  const resetGame = useCallback(() => {
    setBirdPosition(GAME_AREA_HEIGHT / 2 - BIRD_SIZE / 2);
    setPipes([]);
    setScore(0);
    setIsNewHighScore(false);
    setShowHighScoreMessage(false);
    velocity.current = 0;
    groundPosition.current = 0;
  }, []);

  const startGame = useCallback(() => {
    if (gameState === GAME_STATES.GAME_OVER) resetGame();
    setGameState(GAME_STATES.RUNNING);
    // playbg();
  }, [gameState, resetGame]);

  const handleJump = useCallback(() => {
    if (gameState === GAME_STATES.GAME_OVER) return;
    if (gameState === GAME_STATES.IDLE) startGame();
    velocity.current = JUMP_FORCE;
    playjump();
  }, [gameState, startGame]);

  const checkCollision = useCallback((pipes) => {
    if (birdPosition >= GAME_AREA_HEIGHT - BIRD_SIZE - GROUND_HEIGHT) return true;
    if (birdPosition <= 0) {
      velocity.current = 0;
      return false;
    }

    return pipes.some(pipe => {
      const birdLeft = 100;
      const birdRight = birdLeft + BIRD_SIZE;
      const birdTop = birdPosition;
      const birdBottom = birdPosition + BIRD_SIZE;
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        if (birdTop <= pipe.topHeight || birdBottom >= GAME_AREA_HEIGHT - pipe.bottomHeight - GROUND_HEIGHT) {
          return true;
        }
      }
      return false;
    });
  }, [birdPosition]);

  const checkPipePassed = useCallback((pipes) => {
    const birdLeft = 100;
    let newPipes = [...pipes];
    let scoreIncrement = 0;

    newPipes = newPipes.map(pipe => {
      if (!pipe.passed && pipe.x + PIPE_WIDTH < birdLeft) {
        scoreIncrement++;
        playpoint();
        return { ...pipe, passed: true };
      }
      return pipe;
    });

    if (scoreIncrement > 0) setScore(prev => prev + scoreIncrement);
    return newPipes;
  }, []);

  const saveScore = useCallback(async (finalScore) => {
    try {
      const data = {
        url: apis().saveScore,
        method: "POST",
        data: { score: finalScore },
      };
      const result = await httpAction(data);
      if (result?.success && finalScore > previousHighScore.current) {
        setIsNewHighScore(true);
        setShowHighScoreMessage(true);
        setTimeout(() => setShowHighScoreMessage(false), 3000);
        fetchHighestScore();
      }
    } catch (error) {
      console.error("❌ Error saving score:", error);
    }
  }, [fetchHighestScore]);

  useEffect(() => {
    if (gameState !== GAME_STATES.RUNNING) return;

    let lastTime = 0;
    const gameLoop = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      setBirdPosition(prev => {
        velocity.current += GRAVITY;
        return prev + velocity.current;
      });

      setPipes(prev => {
        let updated = prev
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter(pipe => pipe.x > -PIPE_WIDTH);

        if (!updated.length || updated[updated.length - 1].x < GAME_AREA_WIDTH - 300) {
          updated.push(generatePipe());
        }
        return updated;
      });

      groundPosition.current = (groundPosition.current - PIPE_SPEED) % 16;

      setPipes(currentPipes => {
        const updated = checkPipePassed(currentPipes);
        if (checkCollision(updated)) {
          setGameState(GAME_STATES.GAME_OVER);
          stopbg();
          playdie();
          setTimeout(() => saveScore(scoreRef.current), 0);
        }
        return updated;
      });

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameState, checkCollision, checkPipePassed, generatePipe, saveScore]);

  useEffect(() => {
    const onKeyDown = (e) => e.code === "Space" && (e.preventDefault(), handleJump());
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleJump]);

  return (
    <div
      ref={gameAreaRef}
      className="game-area"
      style={{
        width: `${GAME_AREA_WIDTH}px`,
        height: `${GAME_AREA_HEIGHT}px`,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#87CEEB",
        border: "2px solid #333",
        borderRadius: "8px",
        fontFamily: "Jersey 20",
        margin: "0 auto",
      }}
      onClick={gameState === GAME_STATES.IDLE ? startGame : handleJump}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          width: "100%",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          zIndex: 10,
        }}
      >
        {score}
      </div>

      {showHighScoreMessage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 215, 0, 0.95)",
            color: "#ff6b35",
            padding: "20px",
            borderRadius: "15px",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: 30,
            border: "3px solid #ff6b35",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
            animation: "bounce 0.6s ease-in-out",
          }}
        >
          🎉 Yoohoo! You got a high score! 🎉
        </div>
      )}

      <Bird position={birdPosition} isGameOver={gameState === GAME_STATES.GAME_OVER} />
      {pipes.map(pipe => (
        <Pipe key={pipe.id} {...pipe} width={PIPE_WIDTH} gap={PIPE_GAP} gameHeight={GAME_AREA_HEIGHT} groundHeight={GROUND_HEIGHT} />
      ))}
      <Ground position={groundPosition.current} height={GROUND_HEIGHT} width={GAME_AREA_WIDTH} />

      {gameState === GAME_STATES.GAME_OVER && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 20, color: "white", textAlign: "center",
        }}>
          <h2 style={{ fontSize: "5rem", fontFamily: "Jersey 20" }}>Game Over!</h2>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
          {isNewHighScore && <p style={{ color: "#FFD700", fontWeight: "bold" }}>🎉 NEW HIGH SCORE! 🎉</p>}
          <button onClick={startGame} style={{
            marginTop: "20px", padding: "10px 30px", fontSize: "18px",
            backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer",
          }}>
            Play Again
          </button>
        </div>
      )}

      {gameState === GAME_STATES.IDLE && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 20, color: "white", textAlign: "center",
        }}>
          <h2>Flappy Bird</h2>
          <p>Click or press SPACE to start</p>
          <p>Press SPACE to jump</p>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          40% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
          60% {
            transform: translate(-50%, -50%) translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}

export default GameDisplay;
