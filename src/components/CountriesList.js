import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SVG from 'react-inlinesvg';
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

  const shapesState = useSelector((state) => state.shapes);

  useEffect(() => {
    if (shapesState.status !== 'FETCHING_SHAPE_SUCCEEDED' || !shapesState.statusByContinent[continentCamelCase]) {
      dispatch(fetchCountryShape(continentCountries, continentCamelCase));
    }
  }, []);

  console.log(shapesState);

  if (shapesState.status === 'FETCHING_SHAPE_SUCCEEDED') {
    return (
      <>
        {continentCountries.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>cases</p>
            <p>{countriesMetrics[item.name].today_new_confirmed}</p>
            <SVG src={shapesState.shapes[item.id]} width={200} />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <h2>{shapesState.status}</h2>
    </>
  );
};

CountriesList.propTypes = {
  continent: PropTypes.string.isRequired,
};

export default CountriesList;
