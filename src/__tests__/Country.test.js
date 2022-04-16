import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
import Router from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import Country from '../components/Country';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    countryId: 'peru',
  }),
}));

describe('Tests for the Country component', () => {
  test('The component should display a loading icon when starting to fetch data', () => {
    const reducerMock = () => ({
      filter: {
        countriesMetrics: {},
        countriesByContinent: {},
        status: 'FETCHING_COUNTRIES_METRICS',
      },
      shapes: {
        status: 'FETCHING_SHAPE',
        statusByContinent: {
          asia: 'true',
          shapes: {},
        },
      },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <Country />
        </Router.BrowserRouter>
      </Provider>,
    );

    expect(getByText(/Loading/i)).toBeInTheDocument();
  });
  test('The component should display an error when fetching fails', () => {
    const reducerMock = () => ({
      filter: {
        countriesMetrics: {},
        countriesByContinent: {},
        status: 'FETCHING_COUNTRIES_METRICS_FAILED',
        error: 'test_error',
      },
      shapes: {
        status: 'FETCHING_SHAPE',
        statusByContinent: {
          asia: 'true',
          shapes: {},
        },
      },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <Country />
        </Router.BrowserRouter>
      </Provider>,
    );

    expect(getByText(/test_error/i)).toBeInTheDocument();
  });
  test('The component should display metrics for a country when fetching succeeds', () => {
    const reducerMock = () => ({
      filter: {
        status: 'FETCHING_COUNTRIES_METRICS_SUCCEEDED',
        countriesMetrics: {
          Peru: {
            today_new_confirmed: 'test_metrics',
            regions: [],
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
        status: 'FETCHING_SHAPE',
        statusByContinent: {
          asia: 'true',
        },
        shapes: {},
      },
    });

    const store = createStore(reducerMock, applyMiddleware(thunk));

    const { getByText } = render(
      <Provider store={store}>
        <Router.BrowserRouter>
          <Country />
        </Router.BrowserRouter>
      </Provider>,
    );

    expect(getByText(/Statistics/i)).toBeInTheDocument();
    expect(getByText(/test_metrics/i)).toBeInTheDocument();
  });
});
