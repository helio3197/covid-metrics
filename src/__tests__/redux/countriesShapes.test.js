import '@testing-library/jest-dom';
import countriesShapesReducer, { FETCH_SHAPE_BEGAN, FETCH_SHAPE_FAILED } from '../../redux/countries-shapes/countriesShapes';

describe('Tests for the countriesShapes reducer', () => {
  test('Calling the reducer with no specified action.type should return the initial state', () => {
    expect(countriesShapesReducer(undefined, {}).status).toBe('initial');
  });
  test('Calling fetchCountryShapeBegin() action creator should return the state object with a status prop', () => {
    expect(countriesShapesReducer(undefined, { type: FETCH_SHAPE_BEGAN }).status).toBe('FETCHING_SHAPE');
  });
  test('Calling fetchCountryShapeFailure(error) action creator should return the state object with a status and error prop', () => {
    expect(countriesShapesReducer(undefined, { type: FETCH_SHAPE_FAILED, error: 'TEST_ERROR' }).status).toBe('FETCHING_SHAPE_FAILED');
    expect(countriesShapesReducer(undefined, { type: FETCH_SHAPE_FAILED, error: 'TEST_ERROR' }).error).toBe('TEST_ERROR');
  });
});
