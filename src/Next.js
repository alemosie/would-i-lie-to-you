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
      <Row>
        <Button variant="success" onClick={() => handleAnswer('truth')}>Truth</Button>
        <span>or</span>
        <Button variant="danger" onClick={() => handleAnswer('lie')}>Lie</Button>
        <span>?</span>
      </Row>
    )
  } else {
    return (
      <Row>
        <Button
          id="Next-button"
          variant="outline"
          onClick={onClick}>
          {getButtonText()}
        </Button>
      </Row>
    )
  }
}