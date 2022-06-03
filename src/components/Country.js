import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import SVG from 'react-inlinesvg';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { FcStatistics, FcSearch } from 'react-icons/fc';
import { updatePath } from '../redux/path/path';
import { fetchCountryShape } from '../redux/countries-shapes/countriesShapes';
import countries from '../assets/countriesList';
import toCamelCase from '../utils';

const Country = () => {
  const dispatch = useDispatch();
  const { countriesMetrics, status, error } = useSelector((state) => state.filter);

  const [regionDetails, setRegionDetails] = useState({});

  const { state } = useLocation();

  const prevPath = state?.prev || '/';

  const { countryId } = useParams();

  const countryData = countries.reduce((value, item) => (item.id === countryId ? item : value));

  const countryMetricsId = countryData.name;

  const {
    status: statusShapes,
    statusByContinent: { [toCamelCase(countryData.continent)]: continentStatus },
    shapes,
    // error: errorShapes,
  } = useSelector((state) => state.shapes);

  useEffect(() => {
    dispatch(updatePath(`${countryMetricsId} metrics`, prevPath));
    if (statusShapes !== 'FETCHING_SHAPE_SUCCEEDED' || !continentStatus) {
      dispatch(fetchCountryShape([countryData], 'single_country'));
    }
  }, []);

  const renderCountryMap = () => {
    switch (statusShapes) {
      case 'FETCHING_SHAPE':
        return (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        );
      case 'FETCHING_SHAPE_FAILED':
        return (
          <div className="map-null">
            <MdOutlineImageNotSupported />
          </div>
        );
      case 'FETCHING_SHAPE_SUCCEEDED':
        return (
          <>
            {shapes[countryId]
              ? (
                <SVG src={shapes[countryId]} className="country-map" styles={{ height: '100%', width: 'auto' }}>
                  <div className="map-null">
                    <MdOutlineImageNotSupported />
                  </div>
                </SVG>
              )
              : (
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
          </>
        );
      default:
        return (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
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
                {`Something went wrong: ${error}`}
              </h2>
            </Col>
          </Row>
        );
      case 'FETCHING_COUNTRIES_METRICS_SUCCEEDED': {
        const lastCountryMetrics = countriesMetrics[countryMetricsId];

        const metrics24hArr = [
          {
            name: 'Cases:',
            value: lastCountryMetrics.today_new_confirmed,
            id: 'today_new_confirmed',
          },
          {
            name: 'Deaths:',
            value: lastCountryMetrics.today_new_deaths,
            id: 'today_new_deaths',
          },
          {
            name: 'Open cases:',
            value: lastCountryMetrics.today_new_open_cases,
            id: 'today_new_open_cases',
          },
          {
            name: 'Recovered patients:',
            value: lastCountryMetrics.today_new_recovered,
            id: 'today_new_recovered',
          },
        ];

        const metricsTotalArr = [
          {
            name: 'Cases:',
            value: lastCountryMetrics.today_confirmed,
            id: 'today_confirmed',
          },
          {
            name: 'Deaths:',
            value: lastCountryMetrics.today_deaths,
            id: 'today_deaths',
          },
          {
            name: 'Open cases:',
            value: lastCountryMetrics.today_open_cases,
            id: 'today_open_cases',
          },
          {
            name: 'Recovered patients:',
            value: lastCountryMetrics.today_recovered,
            id: 'today_recovered',
          },
        ];

        return (
          <>
            <Row className="filter-item-row">
              <Col xs="6">
                {renderCountryMap()}
              </Col>
              <Col xs="6" className="continent-metrics">
                <h2 className="mb-1">Last update:</h2>
                <h2 className="ms-2 fs-6 fst-italic">{lastCountryMetrics.date}</h2>
                <p className="fw-bold">
                  Source:
                  <span className="d-block ms-2 fw-normal fst-italic">{lastCountryMetrics.source}</span>
                </p>
              </Col>
            </Row>
            <Row xs="1" className="pt-3 pb-2">
              <Col>
                <h3 className="fs-4 text-center text-decoration-underline">
                  Statistics
                  {' '}
                  <FcStatistics />
                </h3>
              </Col>
            </Row>
            <Row>
              <Col className="p-0">
                <h4 className="fs-5 border-bottom">Last 24h metrics:</h4>
                <Row as="ul" xs="2" className="p-0">
                  {metrics24hArr.map((item) => (
                    <Col as="li" key={item.id} className="country-tile">
                      <h5 className="fs-6 text-secondary">{item.name}</h5>
                      <p>{item.value}</p>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="p-0">
                <h4 className="fs-5 border-bottom">Total metrics:</h4>
                <Row as="ul" xs="2" className="p-0 mb-0">
                  {metricsTotalArr.map((item) => (
                    <Col as="li" key={item.id} className="country-tile">
                      <h5 className="fs-6 text-secondary">{item.name}</h5>
                      <p>{item.value}</p>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row xs="1" className="pt-2">
              <Col>
                <h3 className="fs-4 text-center text-decoration-underline">
                  Regions
                  {' '}
                  <FcSearch />
                </h3>
              </Col>
            </Row>
            {lastCountryMetrics.regions.length
              ? (
                <Row as="ul" xs="1" className="p-0 mb-0 regions-list">
                  {lastCountryMetrics.regions.map((item) => (
                    <Col as="li" key={item.id} className="country-tile">
                      <Row>
                        <Col xs="8">
                          <h4 className="fs-5 text-light">{item.name}</h4>
                        </Col>
                        <Col xs="4" className="p-0 d-flex flex-column align-items-start">
                          <small className="fst-italic">
                            {item.today_new_confirmed}
                            {' '}
                            <span className="text-nowrap">
                              new cases
                            </span>
                          </small>
                          <Button
                            variant="link"
                            className="py-0 px-0 text-light"
                            style={{ fontSize: '0.875rem' }}
                            onClick={regionDetails[item.id]
                              ? () => setRegionDetails((state) => ({
                                ...state,
                                [item.id]: false,
                              })) : () => setRegionDetails((state) => ({
                                ...state,
                                [item.id]: true,
                              }))}
                          >
                            {regionDetails[item.id] ? 'View less' : 'View details'}
                          </Button>
                        </Col>
                      </Row>
                      {regionDetails[item.id]
                        && (
                        <Row as="ul" xs="2" className="p-0 mb-0">
                          <Col as="li" className="country-tile justify-content-start">
                            <h5 className="fs-6 fw-bold">Total cases:</h5>
                            <p className="m-0">{item.today_confirmed}</p>
                          </Col>
                          <Col as="li" className="country-tile justify-content-start">
                            <h5 className="fs-6 fw-bold">Total deaths:</h5>
                            <p className="m-0">{item.today_deaths}</p>
                          </Col>
                          <Col as="li" className="country-tile justify-content-start">
                            <h5 className="fs-6 fw-bold">Total open cases:</h5>
                            <p className="m-0">{item.today_open_cases}</p>
                          </Col>
                          <Col as="li" className="country-tile justify-content-start">
                            <h5 className="fs-6 fw-bold">Total recovered patients:</h5>
                            <p className="m-0">{item.today_recovered}</p>
                          </Col>
                        </Row>
                        )}
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row>
                  <Col>
                    <h4 className="fs-6 text-center">
                      No regions available
                    </h4>
                  </Col>
                </Row>
              )}
          </>
        );
      }
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
