import "./Game-Over.css";

const GameOver = ({ turns, setIsGameOver, shuffleCards }) => {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <h3>You did it in {turns} turns</h3>
      <span
        className="close"
        onClick={() => {
          setIsGameOver(false);
        }}
      >
        X
      </span>
      <button className="new-game" onClick={shuffleCards}>
        New Game
      </button>
    </div>
  );
};

export default GameOver;
