const UPDATE_PATH = 'covid-metrics/path/UPDATE_PATH';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PATH:
      return {
        header: action.header,
        previous: action.previous,
      };
    default:
      return state;
  }
};

export const updatePath = (header, previous) => (
  {
    type: UPDATE_PATH,
    header,
    previous,
  }
);

export default reducer;
