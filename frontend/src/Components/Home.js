import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1 className="display-4">Welcome to Money Management App</h1>
          <p className="lead">Manage your finances efficiently and effectively.</p>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <h2>Already a user?</h2>
          <NavLink to="/login">
            <Button variant="primary" size="lg">
              Login
            </Button>
          </NavLink>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <h2>New user?</h2>
          <NavLink to="/signup">
            <Button variant="success" size="lg">
              Signup
            </Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
