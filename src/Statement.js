import { Row } from 'react-bootstrap';

export const Statement = (props) => {
  const { statement, answer, correct, end } = props;

  const getCorrectText = () => {
    if (correct) {
      return 'Correct! 🏆'
    } else if (correct === false) {
      return 'Incorrect 😔'
    }
  }

  if (answer) {
    return (
      <div className="Statement Answer">
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