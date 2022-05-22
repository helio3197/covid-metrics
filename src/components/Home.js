import React, { useEffect, useRef, useState } from 'react';
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
  const [selectedResult, setSelectedResult] = useState(0);

  const selectedResultElement = useRef(null);
  const searchresultsContainer = useRef(null);

  const {
    globalMetrics, date, status, error, lastUpdate,
  } = useSelector((state) => state.home);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePath('Global Covid Metrics'));
  }, []);

  const renderLink = ({ children, className }) => (
    <Link to="/filter" className={className} onClick={() => window.scrollTo(0, 0)}>{children}</Link>
  );

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
                {`Something sent wrong: ${error}`}
              </h3>
            </Col>
          </Row>
        );
      case 'FETCHING_GLOBAL_METRICS_SUCCEEDED':
        return (
          <Container fluid className="py-3 px-0">
            <h2 className="fs-5 border-bottom border-secondary">{`Updated at: ${lastUpdate}`}</h2>
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

  const searchResultsArr = countries.filter((country) => (
    country.name.toLowerCase().startsWith(filterValue.toLowerCase())
  )).map((item, index) => (
    <Nav.Link
      key={item.id}
      as={({ children, className, onClick }) => (
        <Link
          to={`country/${item.id}`}
          onClick={onClick}
          className={className}
          style={(index === selectedResult) ? { background: '#453c3c' } : {}}
          ref={index === selectedResult ? selectedResultElement : undefined}
        >
          {children}
        </Link>
      )}
      className="border-bottom py-1 search-field-result"
    >
      {item.name}
    </Nav.Link>
  ));

  useEffect(() => {
    if (filterValue) {
      const scrollArea = searchresultsContainer.current.clientHeight;
      const scrollPosition = searchresultsContainer.current.scrollTop;
      const elementPosition = selectedResultElement.current.offsetTop;
      const elementHeight = selectedResultElement.current.offsetHeight;
      const isVisible = elementPosition >= scrollPosition
        && (elementPosition + elementHeight) <= (scrollPosition + scrollArea);

      if (!isVisible) {
        const scrollTo = (elementPosition <= scrollPosition)
          ? elementPosition
          : elementPosition + elementHeight - scrollArea;

        searchresultsContainer.current.scrollTop = scrollTo;
      }
    }
  });

  return (
    <Container fluid="md" as="main">
      <Form onSubmit={(e) => e.preventDefault()}>
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
              setSelectedResult(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedResult(
                  (selectedResult === searchResultsArr.length - 1) ? 0 : selectedResult + 1,
                );
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedResult(
                  (selectedResult === 0) ? searchResultsArr.length - 1 : selectedResult - 1,
                );
              }

              if (e.key === 'Enter' && selectedResultElement.current) {
                selectedResultElement.current.click();
              }
            }}
          />
          {filterValue && (
            <Nav className="shadow" ref={searchresultsContainer}>
              {searchResultsArr}
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
            Filter by continent
          </Button>
        </Col>
      </Row>
      {renderMetrics()}
    </Container>
  );
};

export default Home;
