import { TODAYS_DATE } from '../home/home';

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
    case FETCH_COUNTRIES_METRICS_SUCCEEDED:
      return {
        ...state,
        status: 'FETCHING_COUNTRIES_METRICS_SUCCEEDED',
        countriesMetrics: action.payload,
      };
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
    const { dates: { [TODAYS_DATE]: { countries: data } } } = await response();
    dispatch(fetchCountriesMetricsSucess(data));
  } catch (error) {
    dispatch(fetchCountriesMetricsFailure(error));
  }
};

export default reducer;
