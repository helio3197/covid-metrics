import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const CountriesList = ({ continent }) => {
  const toCamelCase = (str) => (
    str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )).replace(/\s+/g, '')
  );

  const {
    countriesMetrics,
    countriesByContinent: { [toCamelCase(continent)]: continentCountries },
  } = useSelector((state) => state.filter);

  return (
    <>
      {continentCountries.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>cases</p>
          <p>{countriesMetrics[item.name].today_new_confirmed}</p>
        </div>
      ))}
    </>
  );
};

CountriesList.propTypes = {
  continent: PropTypes.string.isRequired,
};

export default CountriesList;
