import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import { ReactComponent as WolrdMap } from '../assets/world.svg';
import { updatePath } from '../redux/path/path';
import countries from '../assets/countriesList';

const Home = () => {
  const [filterValue, setFilterValue] = useState('');

  const {
    globalMetrics, date, status, error,
  } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePath('Global Covid Metrics'));
  }, []);

  const renderLink = ({ children, className }) => (<Link to="/filter" className={className}>{children}</Link>);

  const renderMetrics = () => {
    switch (status) {
      case 'FETCHING_GLOBAL_METRICS':
        return (
          <Row xs="1">
            <Col className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        );
      case 'FETCHING_GLOBAL_METRICS_FAILED':
        return (
          <Row>
            <Col>
              <h3>
                {`Somethin sent wrong: ${error}`}
              </h3>
            </Col>
          </Row>
        );
      case 'FETCHING_GLOBAL_METRICS_SUCCEEDED':
        return (
          <Container fluid className="py-3 px-0">
            <Row xs="2" className="metrics-list">
              <Col className="metric-tile">
                <h3>24h cases:</h3>
                <p>
                  {globalMetrics.todayCases}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>24h deaths:</h3>
                <p>
                  {globalMetrics.todayDeaths}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>24h recovered:</h3>
                <p>
                  {globalMetrics.todayRecovered}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>24h open cases:</h3>
                <p>
                  {globalMetrics.todayOpenCases}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>Total cases:</h3>
                <p>
                  {globalMetrics.totalCases}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>Total deaths:</h3>
                <p>
                  {globalMetrics.totalDeaths}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>Total recovered:</h3>
                <p>
                  {globalMetrics.totalRecovered}
                </p>
              </Col>
              <Col className="metric-tile">
                <h3>Total open cases:</h3>
                <p>
                  {globalMetrics.totalOpenCases}
                </p>
              </Col>
            </Row>
          </Container>
        );
      default:
        return false;
    }
  };

  return (
    <Container fluid="md" as="main">
      <Form>
        <Form.Group controlId="search" className="position-relative">
          <Form.Label visuallyHidden>Search by countries</Form.Label>
          <Form.Control
            type="search"
            placeholder="Search countries..."
            className="search-field"
            autoComplete="off"
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
          {filterValue && (
            <Nav className="shadow">
              {countries.filter((country) => (
                country.name.toLowerCase().startsWith(filterValue.toLowerCase())
              )).map((item) => (
                <Nav.Link
                  key={item.id}
                  as={({ children, className, onClick }) => (
                    <Link to={`country/${item.id}`} onClick={onClick} className={className}>
                      {children}
                    </Link>
                  )}
                  className="border-bottom py-1"
                >
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          )}
        </Form.Group>
      </Form>
      <Row className="pt-3 pb-2" xs="2">
        <Col className="p-0">
          <WolrdMap width="200" height="100" viewBox="1000 -50 200 900" className="svg-map" />
        </Col>
        <Col className="p-0">
          <h2>Global cases</h2>
          <p className="fs-2 m-0">{date}</p>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Button as={renderLink} variant="outline-secondary" className="w-100 py-1 fw-bold outline-button">
            Filter by country
          </Button>
        </Col>
      </Row>
      {renderMetrics()}
    </Container>
  );
};

export default Home;
