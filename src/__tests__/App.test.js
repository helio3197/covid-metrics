import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import App from '../App';

jest.mock('../redux/filter/filter');
jest.mock('../redux/filter/filter');

const reducerMock = () => ({
  path: { header: 'test_header' },
});

const store = createStore(reducerMock, applyMiddleware(thunk));

describe('Tests for the App component', () => {
  test('The component should render', () => {
    const obj = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(obj.getByText(/test_header/i)).toBeInTheDocument();
  });
});
