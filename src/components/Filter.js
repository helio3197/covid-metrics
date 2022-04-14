import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { ReactComponent as EuropeMap } from '../assets/europe.svg';
import { ReactComponent as NorthAmericaMap } from '../assets/north-america.svg';
import { ReactComponent as SouthAmericaMap } from '../assets/south-america.svg';
import { ReactComponent as AfricaMap } from '../assets/africa.svg';
import { ReactComponent as AsiaMap } from '../assets/asia.svg';
import { ReactComponent as OceaniaMap } from '../assets/oceania.svg';
import { updatePath } from '../redux/path/path';

const Filter = () => {
  const {
    status, continentMetrics, error,
  } = useSelector((state) => state.filter);

  const [currentPath, setCurrentPath] = useState({ header: 'Filter by country', previous: '/' });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePath(currentPath.header, currentPath.previous));
  }, [currentPath]);

  const [filterParam] = useSearchParams();

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
            id: 'europe',
          },
          {
            name: 'North America',
            todaysCases: continentMetrics.northAmerica.cases,
            todaysDeaths: continentMetrics.northAmerica.deaths,
            MapComponent: <NorthAmericaMap fill="lightgray" />,
            id: 'north-america',
          },
          {
            name: 'South America',
            todaysCases: continentMetrics.southAmerica.cases,
            todaysDeaths: continentMetrics.southAmerica.deaths,
            MapComponent: <SouthAmericaMap fill="lightgray" />,
            id: 'south-america',
          },
          {
            name: 'Africa',
            todaysCases: continentMetrics.africa.cases,
            todaysDeaths: continentMetrics.africa.deaths,
            MapComponent: <AfricaMap fill="lightgray" />,
            id: 'africa',
          },
          {
            name: 'Asia',
            todaysCases: continentMetrics.asia.cases,
            todaysDeaths: continentMetrics.asia.deaths,
            MapComponent: <AsiaMap fill="lightgray" />,
            id: 'asia',
          },
          {
            name: 'Oceania',
            todaysCases: continentMetrics.oceania.cases,
            todaysDeaths: continentMetrics.oceania.deaths,
            MapComponent: <OceaniaMap viewBox="-50 0 297 210" fill="lightgray" />,
            id: 'oceania',
          },
        ];

        const filterQuery = filterParam.get('continent');

        if (filterQuery) {
          const filteredContinentObj = continents.filter((item) => item.id === filterQuery);

          if (currentPath.header !== filteredContinentObj[0].name) {
            setCurrentPath({
              header: filteredContinentObj[0].name,
              previous: '/filter',
            });
          }

          return (
            <>
              {filteredContinentObj.map((item) => (
                <Row className="filter-item-row" key={item.name}>
                  <Col xs="6">
                    {item.MapComponent}
                  </Col>
                  <Col xs="6" className="continent-metrics">
                    <h2>Today&apos;s metrics</h2>
                    <p className="fw-bold">
                      cases:
                      <span className="ms-2 fw-normal fst-italic">{item.todaysCases}</span>
                    </p>
                    <p className="fw-bold">
                      deaths:
                      <span className="ms-2 fw-normal fst-italic">{item.todaysDeaths}</span>
                    </p>
                  </Col>
                </Row>
              ))}
            </>
          );
        }

        if (currentPath.header !== 'Filter by country') {
          setCurrentPath({
            header: 'Filter by country',
            previous: '/',
          });
        }

        return (
          <>
            {continents.map((item) => (
              <Row className="filter-item-row" key={item.name}>
                <Col xs="6">
                  {item.MapComponent}
                </Col>
                <Col xs="6" className="continent-metrics">
                  <h2>{item.name}</h2>
                  <p className="fw-bold">
                    24h cases:
                    <span className="ms-2 fw-normal fst-italic">{item.todaysCases}</span>
                  </p>
                  <p className="fw-bold">
                    24h deaths:
                    <span className="ms-2 fw-normal fst-italic">{item.todaysDeaths}</span>
                  </p>
                  <Button
                    as={({ children, className }) => (
                      <Link to={`?continent=${item.id}`} className={className}>{children}</Link>
                    )}
                    variant="outline-primary"
                    className="py-0"
                  >
                    Filter
                  </Button>
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