import "./GameOver.css";

const GameOver = ({ restartGame, score }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h3>A sua pontuação foi: <span>{score}</span></h3>
      <button onClick={restartGame}>Resetar Jogo</button>
    </div>
  );
};

export default GameOver;
