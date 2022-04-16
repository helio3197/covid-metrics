jest.createMockFromModule('../home');

const reducer = () => 'test_reducer';

export const fetchGlobalMetrics = () => ({ type: 'mock' });

export default reducer;
