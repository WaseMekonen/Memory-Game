import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Clock from "./components/clock";
import GameOver from "./components/Game-Over";

const cardImages = [
  { src: "/img/Yasur.png", matched: false },
  { src: "/img/Adir.png", matched: false },
  { src: "/img/Kohav.png", matched: false },
  { src: "/img/Peten.png", matched: false },
  { src: "/img/Sofa.png", matched: false },
  { src: "/img/Yanshof.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [counter, setCounter] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsGameOver(false);
    setCounter(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // console.log(cards);
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            setCounter(counter + 1);
            if (card.src === choiceOne.src) {
              if (counter + 1 === cards.length / 2) {
                setTimeout(() => {
                  setIsGameOver(true);
                }, 800);
              }
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Air-crafts Match</h1>
      <section className="header-flex">
        {/* <div className="clock">
          <Clock />
        </div> */}
        <button onClick={shuffleCards}>New Game</button>
        <span className="pairs-counter">
          {counter}/{cards.length / 2}
        </span>
      </section>
      <section className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </section>
      {isGameOver ? (
        <GameOver
          turns={turns}
          setIsGameOver={setIsGameOver}
          shuffleCards={shuffleCards}
        />
      ) : (
        ""
      )}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
