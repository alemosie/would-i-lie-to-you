import logo from './wiltyLogo.png';
import './App.css';

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PLAYERS, statements } from './statements';
import { Statement } from './Statement';
import { Next } from './Next';

// For each player, keep track of whether the other team guessed correctly or incorrectly
const LEDGER = Object.keys(PLAYERS).reduce((ledger, player) => {
  return {
    ...ledger,
    [player]: [],
  };
}, {});
// Correct answer points are awarded to the other team, since they got it right
// Incorrect answer points are awarded to your team, since you convinced them of the wrong answer
const SCORE = {
  team1: 0,
  team2: 0
}
// Each player has a max of 3 turns
const MAX_TURNS = 3


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
  const [team, setTeam] = useState(null);
  const isValidPlayer = (name, statementType) => {
    // Player must be from the other team; have remaining statements; and have 
    // taken fewer than 3 turns to be considered valid
    const otherTeamPlayers = Object.keys(PLAYERS).filter(p => {
      return PLAYERS[p] !== team
    });

    return (
      (otherTeamPlayers.includes(name)) &&
      (remainingStatements[name][statementType].length > 0) &&
      (LEDGER[name].length < MAX_TURNS)
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
      const team = PLAYERS[player];
      const opposingTeam = team === 'team1' ? 'team2' : 'team1'
      const correct = ledger[player].filter(getNumCorrect).length;
      const incorrect = ledger[player].filter(getNumIncorrect).length;

      // Correct is for the other team, incorrect is for your team
      score[team] += incorrect;
      score[opposingTeam] += correct;
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
      setTeam(PLAYERS[nextPlayer]);
      setPlayer(nextPlayer);

      const nextStatement = getStatement(nextPlayer, nextStatementType);
      setStatement(nextStatement);

      // If there's no next player, end the game
    } else {
      setPlayer(null);
      setStatement(null);
      setEnd(true);
      setFinalScore(calculateScore(LEDGER));

      console.log('statements', remainingStatements)
      console.log('turns', PLAYERS);
      console.log('ledger', LEDGER);
    }

  }

  const getTeamPlayerElements = (team) => {
    const elements = [];
    Object.keys(PLAYERS).forEach((p) => {
      // Capitalize name
      const name = p.charAt(0).toUpperCase() + p.slice(1)
      // Create player block
      if (PLAYERS[p] === team) {
        elements.push(<div className={player === p ? 'active' : ''}>{name}</div>)
      }
    });
    return elements;
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <Container className="Game-container">
        <Col lg={2}>
          <Row className="Players Team-1">
            {getTeamPlayerElements('team1')}
          </Row>
        </Col>
        <Col>
          < Statement statement={statement} answer={answer} correct={correct} end={end} />
          < Next onNext={onNext} statement={statement} answer={answer} handleAnswer={handleAnswer} end={end} score={finalScore} />
        </Col>
        <Col lg={2}>
          <Row className="Players Team-2">
            {getTeamPlayerElements('team2')}
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default App;
