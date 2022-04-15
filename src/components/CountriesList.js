import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SVG from 'react-inlinesvg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { fetchCountryShape } from '../redux/countries-shapes/countriesShapes';

const CountriesList = ({ continent }) => {
  const toCamelCase = (str) => (
    str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )).replace(/\s+/g, '')
  );

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

  const renderCountriesList = () => {
    switch (status) {
      case 'FETCHING_SHAPE':
        return (
          <Row xs="1">
            <Col className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        );
      case 'FETCHING_SHAPE_FAILED':
        return (
          <Row xs="1">
            <Col>
              <h2 className="text-center py-5">
                {`Somethin sent wrong: ${error}`}
              </h2>
            </Col>
          </Row>
        );
      case 'FETCHING_SHAPE_SUCCEEDED':
        return (
          <Row as="ul" xs="2" className="p-0">
            {continentCountries.map((item) => (
              <Col as="li" key={item.id} className="country-tile">
                {shapes[item.id]
                  ? <SVG src={shapes[item.id]} className="country-map" />
                  : (
                    <div className="map-null">
                      <MdOutlineImageNotSupported />
                    </div>
                  )}
                <h3>{item.name}</h3>
                <small>{`${countriesMetrics[item.name].today_new_confirmed} new cases.`}</small>
                <Button
                  as={({ children, className }) => (
                    <Link to={`/country/${item.id}`} className={className}>{children}</Link>
                  )}
                  variant="outline-primary"
                  className="py-0"
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
      {renderCountriesList()}
    </>
  );
};

CountriesList.propTypes = {
  continent: PropTypes.string.isRequired,
};

export default CountriesList;
