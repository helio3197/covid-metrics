jest.createMockFromModule('../filter');

const reducer = () => 'test_reducer';

export const fetchCountriesMetrics = () => ({ type: 'mock' });

export default reducer;
