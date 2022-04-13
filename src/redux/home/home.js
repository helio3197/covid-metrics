const FETCH_GLOBAL_METRICS_BEGAN = 'covid-metrics/home/FETCH_GLOBAL_METRICS_BEGAN';
const FETCH_GLOBAL_METRICS_FAILED = 'covid-metrics/home/FETCH_GLOBAL_METRICS_FAILED';
const FETCH_GLOBAL_METRICS_SUCCEEDED = 'covid-metrics/home/FETCH_GLOBAL_METRICS_SUCCEEDED';
const GLOBAL_METRICS_API = 'https://api.covid19tracking.narrativa.com/api/2022-04-13/country/spain/region/castilla-la_mancha/sub_region/ciudad_real/';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_METRICS_BEGAN:
      return {
        status: 'FETCHING_GLOBAL_METRICS',
      };
    case FETCH_GLOBAL_METRICS_FAILED:
      return {
        status: 'FETCHING_GLOBAL_METRICS_FAILED',
        error: action.error,
      };
    case FETCH_GLOBAL_METRICS_SUCCEEDED:
      return {
        status: 'FETCHING_GLOBAL_METRICS_SUCCEEDED',
        globalMetrics: { ...action.payload },
      };
    default:
      return state;
  }
};

const fetchGlobalMetricsBegin = () => (
  {
    type: FETCH_GLOBAL_METRICS_BEGAN,
  }
);

const fetchGlobalMetricsFailure = (error) => (
  {
    type: FETCH_GLOBAL_METRICS_FAILED,
    error,
  }
);

const fetchGlobalMetricsSuccess = (payload) => (
  {
    type: FETCH_GLOBAL_METRICS_SUCCEEDED,
    payload,
  }
);

export const fetchGlobalMetrics = () => async (dispatch) => {
  dispatch(fetchGlobalMetricsBegin());
  try {
    const response = await fetch(GLOBAL_METRICS_API);
    if (!response.ok) throw Error(response.statusText);
    const { total: data } = await response.json();
    const globalMetrics = {
      todayCases: data.today_new_confirmed,
      todayDeaths: data.today_new_deaths,
      totalCases: data.today_confirmed,
      totalDeaths: data.today_deaths,
    };
    dispatch(fetchGlobalMetricsSuccess(globalMetrics));
  } catch (error) {
    dispatch(fetchGlobalMetricsFailure(error));
  }
};

export default reducer;
