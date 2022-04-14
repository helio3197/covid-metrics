import { TODAYS_DATE } from '../home/home';
import countries from '../../assets/countriesList';

const FETCH_COUNTRIES_METRICS_BEGAN = 'covid-metrics/filter/FETCH_COUNTRIES_METRICS_BEGAN';
const FETCH_COUNTRIES_METRICS_FAILED = 'covid-metrics/filter/FETCH_COUNTRIES_METRICS_FAILED';
const FETCH_COUNTRIES_METRICS_SUCCEEDED = 'covid-metrics/filter/FETCH_COUNTRIES_METRICS_SUCCEEDED';
const COUNTRIES_METRICS_API = `https://api.covid19tracking.narrativa.com/api/${TODAYS_DATE}`;
const initialState = {
  date: TODAYS_DATE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_METRICS_BEGAN:
      return {
        ...state,
        status: 'FETCHING_COUNTRIES_METRICS',
      };
    case FETCH_COUNTRIES_METRICS_FAILED:
      return {
        ...state,
        status: 'FETCHING_COUNTRIES_METRICS_FAILED',
        error: action.error,
      };
    case FETCH_COUNTRIES_METRICS_SUCCEEDED: {
      const data = action.payload;
      const countMetricsByContinent = (countryNamesArr = []) => (
        countryNamesArr.reduce((total, { name }) => {
          if (data[name].date === TODAYS_DATE) {
            let { cases, deaths } = total;
            cases += data[name].today_new_confirmed;
            deaths += data[name].today_new_deaths;
            return { cases, deaths };
          }
          return total;
        }, { cases: 0, deaths: 0 })
      );
      const europe = countries.filter((item) => item.continent === 'Europe');
      const northAmerica = countries.filter((item) => item.continent === 'North America');
      const southAmerica = countries.filter((item) => item.continent === 'South America');
      const africa = countries.filter((item) => item.continent === 'Africa');
      const asia = countries.filter((item) => item.continent === 'Asia');
      const oceania = countries.filter((item) => item.continent === 'Oceania');
      return {
        ...state,
        status: 'FETCHING_COUNTRIES_METRICS_SUCCEEDED',
        countriesMetrics: data,
        continentMetrics: {
          europe: countMetricsByContinent(europe),
          northAmerica: countMetricsByContinent(northAmerica),
          southAmerica: countMetricsByContinent(southAmerica),
          africa: countMetricsByContinent(africa),
          asia: countMetricsByContinent(asia),
          oceania: countMetricsByContinent(oceania),
        },
        countriesByContinent: {
          europe,
          northAmerica,
          africa,
          asia,
          oceania,
        },
      };
    }
    default:
      return state;
  }
};

const fetchCountriesMetricsBegin = () => (
  {
    type: FETCH_COUNTRIES_METRICS_BEGAN,
  }
);

const fetchCountriesMetricsFailure = (error) => (
  {
    type: FETCH_COUNTRIES_METRICS_FAILED,
    error,
  }
);

const fetchCountriesMetricsSucess = (payload) => (
  {
    type: FETCH_COUNTRIES_METRICS_SUCCEEDED,
    payload,
  }
);

export const fetchCountriesMetrics = () => async (dispatch) => {
  dispatch(fetchCountriesMetricsBegin());
  try {
    const response = await fetch(COUNTRIES_METRICS_API);
    if (!response.ok) throw Error(`${response.status} ${response.statusText}`);
    const { dates: { [TODAYS_DATE]: { countries: data } } } = await response.json();
    dispatch(fetchCountriesMetricsSucess(data));
  } catch (error) {
    dispatch(fetchCountriesMetricsFailure(error));
  }
};

export default reducer;
