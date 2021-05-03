import { Row, Button } from 'react-bootstrap';

export const Next = (props) => {
  const { onFinishedTurn, end } = props;

  if (end) {
    return (
      <Row>
        <Button
          id="Next-button"
          variant="outline"
          onClick={onFinishedTurn}>
          Reveal scores
          </Button>
      </Row>
    )
  } else {
    return (
      <Row>
        <Button
          id="Next-button"
          variant="outline"
          onClick={onFinishedTurn}>
          →
          </Button>
      </Row>
    )
  }
}