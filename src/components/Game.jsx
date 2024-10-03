import "./Game.css";

import { useState, useRef } from "react";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit= (e) => {
    e.preventDefault()
    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus();
  } 

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h3 className="tip">
        Dica sobre a Palavra: <span>{pickedCategory}</span>
      </h3>

      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente Adivinhar uma letra da Palavra: </p>
        <p>Você ainda tem: {guesses} Tentativas(s).</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLetterContains">
        <p>
          Letras Utilizadas:
        </p>
        {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
      </div>
    </div>
  );
};

export default Game;
