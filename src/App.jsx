import "./App.css";
import StartScreen from "./components/StartScreen";
import Game from "./components/game";
import { useCallback, useEffect, useState } from "react";
import { wordsList } from "./data/data";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameState, setGameState] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  //Função de pegar categoria e palavras
  const pickedWordAndCategory = () => {
    // Introduzindo o Objeto
    const categories = Object.keys(words);

    //Descontruindo o objeto e pegando as categorias
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    //Desconstruindo o array de categorias e pegando as palavras
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  };

  //Dando o Start do jogo secret Word Game
  const startGame = () => {
    const { word, category } = pickedWordAndCategory();

    //Criando o Array de Letras da palavra escolhida
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((i) => i.toLowerCase());

    console.log(word, category, wordLetters);

    //Definindo os States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //trocando o Estágio de Games
    setGameState(stages[1].name);
  };

  //Verificando a Letra
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setwrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }

    
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setwrongLetters([]);
  };

  useEffect(
    () => {
      if (guesses <= 0) {
        //reset all states
        clearLetterStates();
        setGameState(stages[2].name);
        console.log(setGameState);
      }
    },
    [guesses]
  );

  
  //Dando o restart no game
  const restartGame = () => {
    setScore(0);
    setGuesses(3);
    setGameState(stages[0].name);
  };

  return (
    <div className="App">
      {gameState === "start" && <StartScreen startGame={startGame} />}
      {gameState === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameState === "end" && (
        <GameOver restartGame={restartGame} score={score} />
      )}
    </div>
  );
}

export default App;
