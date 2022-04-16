import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import Filter from '../components/Filter';

const countriesDataMock = {
  status: 'FETCHING_COUNTRIES_METRICS_SUCCEEDED',
  continentMetrics: {
    europe: {
      cases: 'test_cases',
      deaths: 'test_deaths',
    },
    northAmerica: {
      cases: '1',
      deaths: '0',
    },
    southAmerica: {
      cases: '12',
      deaths: '11',
    },
    africa: {
      cases: '2',
      deaths: '4',
    },
    asia: {
      cases: '7',
      deaths: '10',
    },
    oceania: {
      cases: '5',
      deaths: '8',
    },
  },
};

describe('Tests for the Filter component', () => {
  test('The component should display a loading icon when starting to fetch data', () => {
    const reducerMock = () => ({
      filter: { status: 'FETCHING_COUNTRIES_METRICS' },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Filter />
        </Router>
      </Provider>,
    );

    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  test('The component should display an error when the fetch fails', () => {
    const reducerMock = () => ({
      filter: { status: 'FETCHING_COUNTRIES_METRICS_FAILED', error: 'test_error' },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Filter />
        </Router>
      </Provider>,
    );

    expect(getByText(/test_error/i)).toBeInTheDocument();
  });
  test('The component should render and displays a list of continents when the fetcthing succeeds', () => {
    const reducerMock = () => ({
      filter: countriesDataMock,
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Filter />
        </Router>
      </Provider>,
    );

    expect(getByText(/test_cases/i)).toBeInTheDocument();
  });
});
