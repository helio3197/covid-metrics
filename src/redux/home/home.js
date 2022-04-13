const FETCH_GLOBAL_METRICS_BEGAN = 'covid-metrics/home/FETCH_GLOBAL_METRICS_BEGAN';
const FETCH_GLOBAL_METRICS_FAILED = 'covid-metrics/home/FETCH_GLOBAL_METRICS_FAILED';
const FETCH_GLOBAL_METRICS_SUCCEEDED = 'covid-metrics/home/FETCH_GLOBAL_METRICS_SUCCEEDED';
const date = new Date();
const TODAYS_DATE = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const GLOBAL_METRICS_API = `https://api.covid19tracking.narrativa.com/api/${TODAYS_DATE}/country/spain/region/castilla-la_mancha/sub_region/ciudad_real`;
const initialState = {
  date: TODAYS_DATE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_METRICS_BEGAN:
      return {
        ...state,
        status: 'FETCHING_GLOBAL_METRICS',
      };
    case FETCH_GLOBAL_METRICS_FAILED:
      return {
        ...state,
        status: 'FETCHING_GLOBAL_METRICS_FAILED',
        error: action.error,
      };
    case FETCH_GLOBAL_METRICS_SUCCEEDED:
      return {
        ...state,
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
    if (!response.ok) throw Error(`${response.status} ${response.statusText}`);
    const { total: data } = await response.json();
    const globalMetrics = {
      todayCases: data.today_new_confirmed,
      todayDeaths: data.today_new_deaths,
      totalCases: data.today_confirmed,
      totalDeaths: data.today_deaths,
      todayOpenCases: data.today_new_open_cases,
      todayRecovered: data.today_new_recovered,
      totalOpenCases: data.today_open_cases,
      totalRecovered: data.today_recovered,
    };
    dispatch(fetchGlobalMetricsSuccess(globalMetrics));
  } catch (error) {
    dispatch(fetchGlobalMetricsFailure(error));
  }
};

export default reducer;
