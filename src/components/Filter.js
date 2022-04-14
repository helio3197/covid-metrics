import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { ReactComponent as EuropeMap } from '../assets/europe.svg';
import { ReactComponent as NorthAmericaMap } from '../assets/north-america.svg';
import { ReactComponent as SouthAmericaMap } from '../assets/south-america.svg';
import { ReactComponent as AfricaMap } from '../assets/africa.svg';
import { ReactComponent as AsiaMap } from '../assets/asia.svg';
import { ReactComponent as OceaniaMap } from '../assets/oceania.svg';

const Filter = () => {
  const {
    countriesMetrics, status, continentMetrics, error,
  } = useSelector((state) => state.filter);
  console.log(continentMetrics, countriesMetrics);

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
      case 'FETCHING_COUNTRIES_METRICS_SUCCEEDED': {
        const continents = [
          {
            name: 'Europe',
            todaysCases: continentMetrics.europe.cases,
            todaysDeaths: continentMetrics.europe.deaths,
            MapComponent: <EuropeMap viewBox="330 100 500 575" fill="lightgray" />,
          },
          {
            name: 'North America',
            todaysCases: continentMetrics.northAmerica.cases,
            todaysDeaths: continentMetrics.northAmerica.deaths,
            MapComponent: <NorthAmericaMap fill="lightgray" />,
          },
          {
            name: 'South America',
            todaysCases: continentMetrics.southAmerica.cases,
            todaysDeaths: continentMetrics.southAmerica.deaths,
            MapComponent: <SouthAmericaMap fill="lightgray" />,
          },
          {
            name: 'Africa',
            todaysCases: continentMetrics.africa.cases,
            todaysDeaths: continentMetrics.africa.deaths,
            MapComponent: <AfricaMap fill="lightgray" />,
          },
          {
            name: 'Asia',
            todaysCases: continentMetrics.asia.cases,
            todaysDeaths: continentMetrics.asia.deaths,
            MapComponent: <AsiaMap fill="lightgray" />,
          },
          {
            name: 'Oceania',
            todaysCases: continentMetrics.oceania.cases,
            todaysDeaths: continentMetrics.oceania.deaths,
            MapComponent: <OceaniaMap viewBox="-50 0 297 210" fill="lightgray" />,
          },
        ];
        return (
          <>
            {continents.map((item) => (
              <Row className="filter-item-row" key={item.name}>
                <Col xs="6">
                  {item.MapComponent}
                </Col>
                <Col xs="6" className="continent-metrics">
                  <h2>{item.name}</h2>
                  <p>
                    24h cases:
                    <span>{item.todaysCases}</span>
                  </p>
                  <p>
                    24h deaths:
                    <span>{item.todaysDeaths}</span>
                  </p>
                </Col>
              </Row>
            ))}
          </>
        );
      }
      default:
        return false;
    }
  };

  return (
    <Container fluid="md" as="section">
      {renderMetrics()}
    </Container>
  );
};

export default Filter;
