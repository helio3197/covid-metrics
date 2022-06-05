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
import { fetchGlobalMetrics, TODAYS_DATE } from '../redux/home/home';
import { fetchCountriesMetrics } from '../redux/filter/filter';
import CountriesList from './CountriesList';

const Filter = () => {
  const {
    status, continentMetrics, error, date,
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
                {`Something went wrong: ${error}`}
              </h2>
              {error.toString().includes('No data for')
                && (
                <p>
                  The data provider has stopped updating the daily metrics. The latest valid date
                  was:
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(fetchGlobalMetrics('2022-06-02'));
                      dispatch(fetchCountriesMetrics('2022-06-02'));
                    }}
                    className="btn btn-link text-secondary"
                  >
                    2022-06-02
                  </button>
                </p>
                )}
            </Col>
          </Row>
        );
      case 'FETCHING_COUNTRIES_METRICS_SUCCEEDED': {
        const continents = [
          {
            name: 'Europe',
            todaysCases: continentMetrics.europe.cases,
            todaysDeaths: continentMetrics.europe.deaths,
            MapComponent: <EuropeMap viewBox="330 100 500 575" className="continent-map" />,
            id: 'europe',
          },
          {
            name: 'North America',
            todaysCases: continentMetrics.northAmerica.cases,
            todaysDeaths: continentMetrics.northAmerica.deaths,
            MapComponent: <NorthAmericaMap className="continent-map" />,
            id: 'north-america',
          },
          {
            name: 'South America',
            todaysCases: continentMetrics.southAmerica.cases,
            todaysDeaths: continentMetrics.southAmerica.deaths,
            MapComponent: <SouthAmericaMap className="continent-map" />,
            id: 'south-america',
          },
          {
            name: 'Africa',
            todaysCases: continentMetrics.africa.cases,
            todaysDeaths: continentMetrics.africa.deaths,
            MapComponent: <AfricaMap className="continent-map" />,
            id: 'africa',
          },
          {
            name: 'Asia',
            todaysCases: continentMetrics.asia.cases,
            todaysDeaths: continentMetrics.asia.deaths,
            MapComponent: <AsiaMap className="continent-map" />,
            id: 'asia',
          },
          {
            name: 'Oceania',
            todaysCases: continentMetrics.oceania.cases,
            todaysDeaths: continentMetrics.oceania.deaths,
            MapComponent: <OceaniaMap viewBox="-50 0 297 210" className="continent-map" />,
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
                    <h2>
                      {date === TODAYS_DATE ? 'Today\'s metrics' : `${date} metrics`}
                    </h2>
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
              <CountriesList continent={filterQuery} />
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
                      <Link
                        to={`?continent=${item.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className={className}
                      >
                        {children}
                      </Link>
                    )}
                    variant="outline-secondary"
                    className="py-0 outline-button"
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
    <Container fluid="md" as="section" className="mb-3">
      {renderMetrics()}
    </Container>
  );
};

export default Filter;
