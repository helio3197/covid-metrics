import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import SVG from 'react-inlinesvg';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { updatePath } from '../redux/path/path';
import { fetchCountryShape } from '../redux/countries-shapes/countriesShapes';
import countries from '../assets/countriesList';
import toCamelCase from '../utils';

const Country = () => {
  const dispatch = useDispatch();
  const { countriesMetrics, status, error } = useSelector((state) => state.filter);

  const { state } = useLocation();

  const prevPath = state?.prev || '/';

  const { countryId } = useParams();

  const countryData = countries.reduce((value, item) => (item.id === countryId ? item : value));

  const {
    status: statusShapes,
    statusByContinent: { [toCamelCase(countryData.continent)]: continentStatus },
    shapes,
    // error: errorShapes,
  } = useSelector((state) => state.shapes);

  useEffect(() => {
    dispatch(updatePath(`${countryData.name} metrics`, prevPath));
    if (statusShapes !== 'FETCHING_SHAPE_SUCCEEDED' || !continentStatus) {
      dispatch(fetchCountryShape([countryData], 'single_country'));
    }
  }, []);

  console.log(countriesMetrics);

  const renderCountryMap = () => {
    switch (statusShapes) {
      case 'FETCHING_SHAPE':
        return (
          <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      case 'FETCHING_SHAPE_FAILED':
        return (
          <div className="map-null">
            <MdOutlineImageNotSupported />
          </div>
        );
      case 'FETCHING_SHAPE_SUCCEEDED':
        return (
          <SVG src={shapes[countryId]} className="country-map" styles={{ height: '100%', width: 'auto' }} />
        );
      default:
        return (
          <div className="map-null">
            <MdOutlineImageNotSupported />
          </div>
        );
    }
  };

  const renderMetrics = () => {
    switch (status) {
      case 'FETCHING_COUNTRIES_METRICS':
        return (
          <Row xs="1">
            <Col className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        );
      case 'FETCHING_COUNTRIES_METRICS_FAILED':
        return (
          <Row xs="1">
            <Col>
              <h2 className="text-center py-5">
                {`Somethin sent wrong: ${error}`}
              </h2>
            </Col>
          </Row>
        );
      case 'FETCHING_COUNTRIES_METRICS_SUCCEEDED':
        return (
          <Row className="filter-item-row">
            <Col xs="6">
              {renderCountryMap()}
            </Col>
            <Col xs="6" className="continent-metrics">
              <h2>Today&apos;s metrics</h2>
              <p className="fw-bold">
                cases:
                <span className="ms-2 fw-normal fst-italic">{}</span>
              </p>
              <p className="fw-bold">
                deaths:
                <span className="ms-2 fw-normal fst-italic">{}</span>
              </p>
            </Col>
          </Row>
        );
      default:
        return (
          <Row xs="1">
            <Col>
              <h2 className="text-center py-5">
                Unexpected
              </h2>
            </Col>
          </Row>
        );
    }
  };

  return (
    <Container fluid="md" as="section">
      {renderMetrics()}
    </Container>
  );
};

export default Country;
