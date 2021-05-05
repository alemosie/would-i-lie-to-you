import { Row } from 'react-bootstrap';

export const Statement = (props) => {
  const { statement, answer, correct, end } = props;

  const getCorrectText = () => {
    if (correct) {
      return 'It was correct!'
    } else if (correct === false) {
      return 'It was incorrect!'
    } else {
      return 'It is null :('
    }
  }

  if (answer) {
    return (
      <div className="Statement">
        <Row>
          {getCorrectText()}
        </Row>
      </div>
    )
  } else if (!end && statement) {
    return (
      <div className="Statement">
        <Row>
          {statement}
        </Row>
      </div>
    )
  } else {
    return <div />
  }
}