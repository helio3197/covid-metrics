import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SVG from 'react-inlinesvg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { fetchCountryShape } from '../redux/countries-shapes/countriesShapes';
import toCamelCase from '../utils';

const CountriesList = ({ continent }) => {
  const continentCamelCase = toCamelCase(continent);

  const dispatch = useDispatch();

  const {
    countriesMetrics,
    countriesByContinent: { [continentCamelCase]: continentCountries },
  } = useSelector((state) => state.filter);

  const {
    status, statusByContinent, shapes, error,
  } = useSelector((state) => state.shapes);

  useEffect(() => {
    if (status !== 'FETCHING_SHAPE_SUCCEEDED' || !statusByContinent[continentCamelCase]) {
      dispatch(fetchCountryShape(continentCountries, continentCamelCase));
    }
  }, []);

  const [countryNameFilter, setCountryNameFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    sortBy: 'name',
    order: 'ascending',
  });

  const sortMethods = {
    name: (order) => {
      const sortedList = continentCountries.sort((a, b) => {
        if (a.id < b.id) return -1;
        return 1;
      });
      if (order === 'ascending') return sortedList;
      return sortedList.reverse();
    },
    cases: (order) => {
      const sortedList = continentCountries.sort((a, b) => (
        countriesMetrics[a.name].today_new_confirmed - countriesMetrics[b.name].today_new_confirmed
      ));
      if (order === 'ascending') return sortedList;
      return sortedList.reverse();
    },
  };

  const filteredList = sortMethods[filterOptions.sortBy](filterOptions.order).filter((country) => (
    country.name.toLowerCase().startsWith(countryNameFilter.toLowerCase())
  ));

  const location = useLocation();

  const renderCountriesList = () => {
    switch (true) {
      case status === 'FETCHING_SHAPE' && statusByContinent[continentCamelCase] === false:
        return (
          <Row xs="1">
            <Col className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        );
      case status === 'FETCHING_SHAPE_FAILED' && statusByContinent[continentCamelCase] === false:
        return (
          <Row xs="1">
            <Col>
              <h2 className="text-center py-5">
                {`Something went wrong: ${error}`}
              </h2>
            </Col>
          </Row>
        );
      case statusByContinent[continentCamelCase] === true:
        return (
          <Row as="ul" xs="2" className="p-0 mb-0 metrics-list">
            {filteredList.length === 0
            && (
            <h3
              className="text-center w-100 bg-transparent mt-3"
            >
              There are no results.
            </h3>
            )}
            {filteredList.map((item) => (
              <Col as="li" key={item.id} className="country-tile">
                {shapes[item.id]
                  ? (
                    <SVG src={shapes[item.id]} className="country-map country-map-light">
                      <div className="map-null">
                        <MdOutlineImageNotSupported />
                      </div>
                    </SVG>
                  )
                  : (
                    <div className="map-null">
                      <MdOutlineImageNotSupported />
                    </div>
                  )}
                <h3 className="fs-4">{item.name}</h3>
                <small>{`${countriesMetrics[item.name].today_new_confirmed} new cases.`}</small>
                <Button
                  as={({ children, className }) => (
                    <Link
                      to={`/country/${item.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      state={{
                        prev: `${location.pathname}${location.search}`,
                      }}
                      className={className}
                    >
                      {children}
                    </Link>
                  )}
                  variant="outline-light"
                  className="py-0 px-1 px-sm-2"
                >
                  Go to details
                </Button>
              </Col>
            ))}
          </Row>
        );
      default:
        return (
          <Row xs="1">
            <Col>
              <h2 className="text-center py-5">
                {status}
              </h2>
            </Col>
          </Row>
        );
    }
  };

  return (
    <>
      <Row>
        <Accordion className="filters mb-2">
          <Accordion.Item eventKey="0" className="bg-transparent">
            <Accordion.Header>
              Filters
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col>
                  <Form.Group className="d-flex gap-2">
                    <Form.Label className="m-0 text-nowrap">
                      Sort by:
                    </Form.Label>
                    <Form.Select
                      className="search-field"
                      value={filterOptions.sortBy}
                      onChange={(e) => setFilterOptions((state) => ({
                        ...state,
                        sortBy: e.target.value,
                      }))}
                    >
                      <option value="name">Name</option>
                      <option value="cases">Cases</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="d-flex gap-2">
                    <Form.Label className="m-0">
                      Order:
                    </Form.Label>
                    <Form.Select
                      className="search-field"
                      value={filterOptions.order}
                      onChange={(e) => setFilterOptions((state) => ({
                        ...state,
                        order: e.target.value,
                      }))}
                    >
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="d-flex">
                    <Form.Label visuallyHidden>Search by countries</Form.Label>
                    <Form.Control
                      type="search"
                      placeholder="Filter by country name"
                      className="search-field"
                      autoComplete="off"
                      value={countryNameFilter}
                      onChange={(e) => {
                        setCountryNameFilter(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      {renderCountriesList()}
    </>
  );
};

CountriesList.propTypes = {
  continent: PropTypes.string.isRequired,
};

export default CountriesList;
