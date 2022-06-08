import { TODAYS_DATE } from '../home/home';
import countries from '../../assets/countriesList';

export const FETCH_COUNTRIES_METRICS_BEGAN = 'covid-metrics/filter/FETCH_COUNTRIES_METRICS_BEGAN';
export const FETCH_COUNTRIES_METRICS_FAILED = 'covid-metrics/filter/FETCH_COUNTRIES_METRICS_FAILED';
export const FETCH_COUNTRIES_METRICS_SUCCEEDED = 'covid-metrics/filter/FETCH_COUNTRIES_METRICS_SUCCEEDED';
// const COUNTRIES_METRICS_API = (date) => `https://api.covid19tracking.narrativa.com/api/${date}`;
const COUNTRIES_METRICS_API = 'https://disease.sh/v3/covid-19/countries?yesterday=true';
const CONTINENT_METRICS_API = 'https://disease.sh/v3/covid-19/continents?yesterday=true';
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
      const continentsData = action.payloadContinents;
      // const countMetricsByContinent = (countryNamesArr = []) => (
      //   countryNamesArr.reduce((total, { name }) => {
      //     if (data[name].date === action.date) {
      //       let { cases, deaths } = total;
      //       cases += data[name].today_new_confirmed;
      //       deaths += data[name].today_new_deaths;
      //       return { cases, deaths };
      //     }
      //     return total;
      //   }, { cases: 0, deaths: 0 })
      // );
      const listContinentMetrics = (continent) => (
        continentsData.reduce((r, e) => (
          e.continent === continent ? {
            cases: e.todayCases,
            deaths: e.todayDeaths,
          } : r
        ), undefined)
      );

      const data = action.payloadCountries.map((item) => ({
        ...item,
        ...countries[item.country],
      })).filter((item) => item.name);
      const europe = data.filter((item) => item.continent === 'Europe');
      const northAmerica = data.filter((item) => item.continent === 'North America');
      const southAmerica = data.filter((item) => item.continent === 'South America');
      const africa = data.filter((item) => item.continent === 'Africa');
      const asia = data.filter((item) => item.continent === 'Asia');
      const oceania = data.filter((item) => item.continent === 'Oceania');
      return {
        ...state,
        status: 'FETCHING_COUNTRIES_METRICS_SUCCEEDED',
        countriesMetrics: data,
        continentMetrics: {
          europe: listContinentMetrics('Europe'),
          northAmerica: listContinentMetrics('North America'),
          southAmerica: listContinentMetrics('South America'),
          africa: listContinentMetrics('Africa'),
          asia: listContinentMetrics('Asia'),
          oceania: listContinentMetrics('Australia-Oceania'),
        },
        countriesByContinent: {
          europe,
          northAmerica,
          southAmerica,
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

const fetchCountriesMetricsSucess = (countriesData, continentsData) => (
  {
    type: FETCH_COUNTRIES_METRICS_SUCCEEDED,
    payloadCountries: countriesData,
    payloadContinents: continentsData,
  }
);

export const fetchCountriesMetrics = () => async (dispatch) => {
  dispatch(fetchCountriesMetricsBegin());
  try {
    const response = await fetch(COUNTRIES_METRICS_API);
    if (!response.ok) throw Error(`${response.status} ${response.statusText}(${(await response.json()).error})`);
    const data = await response.json();
    const responseConts = await fetch(CONTINENT_METRICS_API);
    if (!responseConts.ok) throw Error(`${responseConts.status} ${responseConts.statusText}(${(await responseConts.json()).error})`);
    const dataConts = await responseConts.json();
    dispatch(fetchCountriesMetricsSucess(data, dataConts));
  } catch (error) {
    dispatch(fetchCountriesMetricsFailure(error));
  }
};

export default reducer;
