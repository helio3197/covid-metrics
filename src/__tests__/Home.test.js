import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import Home from '../components/Home';

const reducerMock = () => ({
  home: { status: 'FETCHING_GLOBAL_METRICS_FAILED', error: 'test_error' },
});

const store = createStore(reducerMock, applyMiddleware(thunk));

describe('Tests for the Home component', () => {
  test('The component should display an error when fetching fails', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(getByText(/test_error/i)).toBeInTheDocument();
  });
});
