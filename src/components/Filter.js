import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as EuropeMap } from '../assets/europe.svg';
import { ReactComponent as NorthAmericaMap } from '../assets/north-america.svg';
import { ReactComponent as SouthAmericaMap } from '../assets/south-america.svg';
import { ReactComponent as AfricaMap } from '../assets/africa.svg';
import { ReactComponent as AsiaMap } from '../assets/asia.svg';
import { ReactComponent as OceaniaMap } from '../assets/oceania.svg';

const Filter = () => {
  const test = 'test';
  return (
    <Container fluid="md" as="section">
      <Row className="filter-item-row">
        <Col xs="7">
          <EuropeMap viewBox="330 100 500 575" fill="lightgray" />
        </Col>
        <Col xs="5">
          {test}
        </Col>
      </Row>
      <Row className="filter-item-row">
        <Col xs="7">
          <NorthAmericaMap fill="lightgray" />
        </Col>
        <Col xs="5">
          {test}
        </Col>
      </Row>
      <Row className="filter-item-row">
        <Col xs="7">
          <SouthAmericaMap fill="lightgray" />
        </Col>
        <Col xs="5">
          {test}
        </Col>
      </Row>
      <Row className="filter-item-row">
        <Col xs="7">
          <AfricaMap fill="lightgray" />
        </Col>
        <Col xs="5">
          {test}
        </Col>
      </Row>
      <Row className="filter-item-row">
        <Col xs="7">
          <AsiaMap fill="lightgray" />
        </Col>
        <Col xs="5">
          {test}
        </Col>
      </Row>
      <Row className="filter-item-row">
        <Col xs="7">
          <OceaniaMap viewBox="-50 0 297 210" fill="lightgray" />
        </Col>
        <Col xs="5">
          {test}
        </Col>
      </Row>
    </Container>
  );
};

export default Filter;
