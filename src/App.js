import logo from './wiltyLogo.png';
import './App.css';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { statements } from './statements';
import { Statement } from './Statement';
import { Next } from './Next';

const MAX_TURNS = 3
const PLAYERS = {
  matt: 0,
  sam: 0,
  aza: 0,
  yuan: 0
}
const LEDGER = {
  // true is 1 point for your team, false is 1 point for other team
  matt: [],
  sam: [],
  aza: [],
  yuan: [],
}
const SCORE = {
  mattAndYuan: 0,
  samAndAza: 0
}

function App() {
  // Determine whether to show truth or lie (random)
  const [statementType, setStatementType] = useState(null);
  const getStatementType = () => {
    const index = Math.floor(Math.random() * 2);
    return ['truth', 'lie'][index];
  }

  // Manage statements: Start off with all, and slowly chip away
  const [statement, setStatement] = useState(null);
  const [remainingStatements] = useState(statements);
  const getStatement = (player, statementType) => {
    // Get remaining statements (statements - previousTurns)
    let possibleStatements = remainingStatements[player][statementType];

    // Random from those remaining
    const statementIndex = Math.floor(Math.random() * possibleStatements.length);
    const statement = possibleStatements[statementIndex];

    return statement;
  }

  // Manage players
  const [player, setPlayer] = useState(null);
  const isValidPlayer = (name, statementType) => {
    return (
      (name !== player) &&
      (remainingStatements[name][statementType].length > 0) &&
      (PLAYERS[name] < MAX_TURNS)
    );
  }
  const getPlayer = (statementType) => {
    // Get random player from those remaining
    const nextPlayers = Object.keys(PLAYERS).filter(name => isValidPlayer(name, statementType));
    if (nextPlayers.length > 0) {
      const playerIndex = Math.floor(Math.random() * nextPlayers.length);
      return nextPlayers[playerIndex];
    }
  }

  // Manage answers
  const [answer, setAnswer] = useState(null);
  const [correct, setCorrect] = useState(null);

  // Manage score
  const [finalScore, setFinalScore] = useState(SCORE);
  const calculateScore = (ledger) => {
    let score = { ...SCORE };
    const getNumCorrect = (val) => val === true;
    const getNumIncorrect = (val) => val === false;

    Object.keys(ledger).forEach((player) => {
      const correct = ledger[player].filter(getNumCorrect).length;
      const incorrect = ledger[player].filter(getNumIncorrect).length;
      if (['matt', 'yuan'].includes(player)) {
        score.mattAndYuan += correct;
        score.samAndAza += incorrect;
      } else if (['sam', 'aza'].includes(player)) {
        score.mattAndYuan += incorrect;
        score.samAndAza += correct;
      }
    })
    return score;
  }

  // Manage end state
  const [end, setEnd] = useState(false);

  const handleAnswer = (chosenAnswer) => {
    // Check to see whether answer was correct
    setAnswer(chosenAnswer);

    if (player && statement) {
      // Answer is true (truth) or false (lie)
      const correctAnswer = statements[player][chosenAnswer].includes(statement);
      setCorrect(correctAnswer);

      // Remove statement from gameplay
      remainingStatements[player][statementType] = remainingStatements[player][statementType].filter(s => s !== statement);

      // Update ledger
      LEDGER[player].push(correctAnswer);
    }

  }
  const onNext = () => {
    // Reset answer
    setAnswer(null);
    setCorrect(null);

    // Get next turn's player and statement
    const nextStatementType = getStatementType();
    setStatementType(nextStatementType);
    const nextPlayer = getPlayer(nextStatementType);

    // There's a valid player to continue
    if (nextPlayer) {
      PLAYERS[nextPlayer] += 1;
      setPlayer(nextPlayer);

      const nextStatement = getStatement(nextPlayer, nextStatementType);
      setStatement(nextStatement);

      // If there's no next player, end the game
    } else {
      setStatement(null);
      setEnd(true);
      setFinalScore(calculateScore(LEDGER));

      console.log('statements', remainingStatements)
      console.log('turns', PLAYERS);
      console.log('ledger', LEDGER);
    }

  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <Container className="Game-container">
        <Col md={4}>
          <Row className="Players">
            <div>Matt</div>
            <div>Yuan</div>
            <div>Sam</div>
            <div>Aza</div>
          </Row>
        </Col>
        <Col md={8}>
          < Statement statement={statement} answer={answer} correct={correct} end={end} />
          < Next onNext={onNext} statement={statement} answer={answer} handleAnswer={handleAnswer} end={end} score={finalScore} />
        </Col>
      </Container>
    </div>
  );
}

export default App;
