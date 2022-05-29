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

  // const [filteredList, setFilteredList] = useState(continentCountries);
  const [filterOptions, setFilterOptions] = useState({
    sortBy: 'name',
    order: 'ascending',
  });

  console.log(continentCountries);

  const sortMethods = {
    name: (order) => {
      const sortedList = continentCountries.sort((a, b) => {
        if (a.id < b.id) return -1;
        return 1;
      });
      if (order === 'ascending') return sortedList;
      return sortedList.reverse();
    },
    cases: () => continentCountries,
  };

  const filteredList = sortMethods[filterOptions.sortBy](filterOptions.order);

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
                {`Somethin sent wrong: ${error}`}
              </h2>
            </Col>
          </Row>
        );
      case statusByContinent[continentCamelCase] === true:
        return (
          <Row as="ul" xs="2" className="p-0 mb-0 metrics-list">
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
        <Col>
          <Form.Group>
            <Form.Label>
              Sort by:
            </Form.Label>
            <Form.Select
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
          <Form.Group>
            <Form.Label>
              Order:
            </Form.Label>
            <Form.Select
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
      </Row>
      {renderCountriesList()}
    </>
  );
};

CountriesList.propTypes = {
  continent: PropTypes.string.isRequired,
};

export default CountriesList;
