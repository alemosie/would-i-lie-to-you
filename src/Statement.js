import { Row, Button } from 'react-bootstrap';

export const Statement = (props) => {
  const { statement, end } = props;

  if (!end) {
    return (
      <div className="Statement">
        <Row>
          {statement}
        </Row>
        <Row>
          <Button variant="success">Truth</Button>
          <span>or</span>
          <Button variant="danger">Lie</Button>
          <span>?</span>
        </Row>
      </div>
    )
  } else {
    return <div />
  }
}