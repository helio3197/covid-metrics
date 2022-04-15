import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryShape } from '../redux/countries-shapes/countriesShapes';

const CountriesList = ({ continent }) => {
  const toCamelCase = (str) => (
    str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )).replace(/\s+/g, '')
  );

  const dispatch = useDispatch();

  const {
    countriesMetrics,
    countriesByContinent: { [toCamelCase(continent)]: continentCountries },
  } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchCountryShape(continentCountries));
  }, []);

  const shapes = useSelector((state) => state.shapes);

  console.log(shapes);

  return (
    <>
      {continentCountries.map((item) => {
        // dispatch(fetchCountryShape(item.id, item.shapeId));
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>cases</p>
            <p>{countriesMetrics[item.name].today_new_confirmed}</p>
          </div>
        );
      })}
    </>
  );
};

CountriesList.propTypes = {
  continent: PropTypes.string.isRequired,
};

export default CountriesList;
