import '@testing-library/jest-dom';
import { TODAYS_DATE } from '../../redux/home/home';
import filterReducer, {
  FETCH_COUNTRIES_METRICS_BEGAN,
  FETCH_COUNTRIES_METRICS_FAILED,
} from '../../redux/filter/filter';

describe('Tests for the filter reducer', () => {
  test('Calling the reducer with no specified action.type should return the initial state', () => {
    expect(filterReducer(undefined, {}).date).toBe(TODAYS_DATE);
  });
  test('Calling fetchCountriesMetricsBegin() action creator should return the state object with a status prop', () => {
    expect(filterReducer(undefined, { type: FETCH_COUNTRIES_METRICS_BEGAN }).status).toBe('FETCHING_COUNTRIES_METRICS');
  });
  test('Calling fetchCountriesMetricsFailure(error) action creator should return the state object with a status and error prop', () => {
    expect(filterReducer(undefined, { type: FETCH_COUNTRIES_METRICS_FAILED, error: 'TEST_ERROR' }).status).toBe('FETCHING_COUNTRIES_METRICS_FAILED');
    expect(filterReducer(undefined, { type: FETCH_COUNTRIES_METRICS_FAILED, error: 'TEST_ERROR' }).error).toBe('TEST_ERROR');
  });
});
