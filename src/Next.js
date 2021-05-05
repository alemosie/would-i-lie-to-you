import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';

export const Next = (props) => {
  const { onNext, statement, answer, handleAnswer, end, score } = props;
  const [start, setStart] = useState(true);
  const [reveal, setReveal] = useState(false);

  const getButtonText = () => {
    if (start) {
      return 'Start'
    } else if (end) {
      return 'Reveal scores'
    } else {
      return '→'
    }
  }

  const onClick = () => {
    if (start) {
      onNext();
      setStart(false);
    } else if (end) {
      setReveal(true);
    } else {
      onNext();
    }
  }

  if (reveal) {
    return (
      <div>
        <div className="Team-score">
          <p className="Team-score-header">Matt & Yuan</p>
          <p>{score.mattAndYuan}</p>
        </div>
        <div className="Team-score">
          <p className="Team-score-header">Sam & Aza</p>
          <p>{score.samAndAza}</p>
        </div>
      </div>
    )
  } else if (statement && !answer) {
    return (
      <Row className="ButtonContainer AnswerButtons">
        <span className="Button Truth" variant="outline" onClick={() => handleAnswer('truth')}>Truth</span>
        <span>or</span>
        <span className="Button Lie" variant="outline" onClick={() => handleAnswer('lie')}>Lie</span>
        <span>?</span>
      </Row>
    )
  } else {
    return (
      <Row className="ButtonContainer">
        <span
          className="Button Next"
          onClick={onClick}>
          {getButtonText()}
        </span>
      </Row>
    )
  }
}