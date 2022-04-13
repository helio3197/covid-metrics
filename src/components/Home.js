import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as WolrdMap } from '../assets/world.svg';

const Home = () => {
  const globalMetrics = useSelector((state) => state.home);
  return (
    <Container fluid="md" as="main">
      <Form>
        <Form.Group controlId="search">
          <Form.Label visuallyHidden>Search by countries</Form.Label>
          <Form.Control type="search" placeholder="Search country" className="search-field" />
        </Form.Group>
      </Form>
      <Row className="py-3" xs="2">
        <Col className="p-0">
          <WolrdMap width="200" height="100" viewBox="1000 -50 200 900" fill="lightgray" />
        </Col>
        <Col className="p-0">
          <h2>Global cases</h2>
          <p className="fs-2">{globalMetrics.date}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
