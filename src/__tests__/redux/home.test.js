import '@testing-library/jest-dom';
import reducerHome, {
  TODAYS_DATE,
  FETCH_GLOBAL_METRICS_BEGAN,
  FETCH_GLOBAL_METRICS_FAILED,
  FETCH_GLOBAL_METRICS_SUCCEEDED,
} from '../../redux/home/home';

describe('Tests for the home reducer', () => {
  test('Calling the reducer with no specified action.type should return the initial state', () => {
    expect(reducerHome(undefined, {}).date).toBe(TODAYS_DATE);
  });
  test('Running the fetchGlobalMetricsBegin() action creator should return the state object with status prop with value: \'FETCHING_GLOBAL_METRICS\'', () => {
    expect(reducerHome(undefined, { type: FETCH_GLOBAL_METRICS_BEGAN }).status).toBe('FETCHING_GLOBAL_METRICS');
  });
  test('Running the fetchGlobalMetricsFailure(error) action creator shoould return the state object with status prop with value: \'FETCHING_GLOBAL_METRICS_FAILED\', and a error prop', () => {
    expect(reducerHome(undefined, { type: FETCH_GLOBAL_METRICS_FAILED, error: 'TEST_ERROR' }).status).toBe('FETCHING_GLOBAL_METRICS_FAILED');
    expect(reducerHome(undefined, { type: FETCH_GLOBAL_METRICS_FAILED, error: 'TEST_ERROR' }).error).toBe('TEST_ERROR');
  });
  test('Running the fetchGlobalMetricsSuccess(error) action creator shoould return the state object with status prop with value: \'FETCHING_GLOBAL_METRICS_SUCCEEDED\', and a globalMetrics prop', () => {
    expect(reducerHome(undefined, { type: FETCH_GLOBAL_METRICS_SUCCEEDED, payload: { test: true } }).status).toBe('FETCHING_GLOBAL_METRICS_SUCCEEDED');
    expect(reducerHome(undefined, { type: FETCH_GLOBAL_METRICS_SUCCEEDED, payload: { test: true } })
      .globalMetrics).toStrictEqual({ test: true });
  });
});
