import logo from './wiltyLogo.png';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { statements } from './statements'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Team-score">
          <p className="Team-score-header">Matt & Yuan</p>
          <p>0</p>
        </div>
        <img src={logo} alt="logo" />
        <div className="Team-score">
          <p className="Team-score-header">Sam & Aza</p>
          <p>0</p>
        </div>
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
          <Row>
            <p className="Statement">{statements.test.lies[0]}</p>
          </Row>
          <Row>
            <Button variant="success">Truth</Button>
            <span>or</span>
            <Button variant="danger">Lie</Button>
            <span>?</span>
          </Row>
          <Row>
            <Button id="Next-button" variant="outline"> →</Button>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default App;
