import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import CountriesList from '../components/CountriesList';

describe('Tests for the CountriesList component', () => {
  test('The component should display a loading icon when starting to fetch data', () => {
    const reducerMock = () => ({
      filter: {
        countriesMetrics: {},
        countriesByContinent: {},
      },
      shapes: {
        status: 'FETCHING_SHAPE',
      },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <CountriesList continent="Asia" />
        </Router>
      </Provider>,
    );

    expect(getByText(/Loading/i)).toBeInTheDocument();
  });
  test('The component should display an error when fetching fails', () => {
    const reducerMock = () => ({
      filter: {
        countriesMetrics: {},
        countriesByContinent: {},
      },
      shapes: {
        status: 'FETCHING_SHAPE_FAILED',
        error: 'test_error',
      },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <CountriesList continent="Asia" />
        </Router>
      </Provider>,
    );

    expect(getByText(/test_error/i)).toBeInTheDocument();
  });
  test('The component should display a countries list when fetching succeeds', () => {
    const reducerMock = () => ({
      filter: {
        countriesMetrics: {
          test_country: {
            today_new_confirmed: '21',
          },
        },
        countriesByContinent: {
          asia: [
            {
              id: 'test_id',
              name: 'test_country',
            },
          ],
        },
      },
      shapes: {
        status: 'FETCHING_SHAPE_SUCCEEDED',
        statusByContinent: {
          asia: 'true',
        },
        shapes: {},
      },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <CountriesList continent="Asia" />
        </Router>
      </Provider>,
    );

    expect(getByText(/test_country/i)).toBeInTheDocument();
    expect(getByText(/21/i)).toBeInTheDocument();
  });
});
