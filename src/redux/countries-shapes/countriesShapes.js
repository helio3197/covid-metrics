import geojsonToSvg from 'geojson-to-svg';

export const FETCH_SHAPE_BEGAN = 'covid-metrics/countries-shapes/FETCH_SHAPE_BEGAN';
export const FETCH_SHAPE_FAILED = 'covid-metrics/countries-shapes/FETCH_SHAPE_FAILED';
const FETCH_SHAPE_SUCCEEDED = 'covid-metrics/countries-shapes/FETCH_SHAPE_SUCCEEDED';
const SHAPES_URL = (id) => (`https://parseapi.back4app.com/classes/Country/${id}?include=shape&keys=name,shape,shape.geoJson`);

const svgfy = (geoJson) => {
  if (!geoJson) return undefined;
  const { type, coordinates } = JSON.parse(geoJson);

  return geojsonToSvg().data({
    type: 'Feature',
    properties: {},
    geometry: {
      type,
      coordinates,
    },
  }).render();
};

const initialState = {
  status: 'initial',
  shapes: {},
  statusByContinent: {
    europe: false,
    northAmerica: false,
    southAmerica: false,
    africa: false,
    asia: false,
    oceania: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHAPE_BEGAN:
      return {
        ...state,
        status: 'FETCHING_SHAPE',
      };
    case FETCH_SHAPE_FAILED:
      return {
        ...state,
        status: 'FETCHING_SHAPE_FAILED',
        error: action.error,
      };
    case FETCH_SHAPE_SUCCEEDED:
      return {
        status: 'FETCHING_SHAPE_SUCCEEDED',
        statusByContinent: {
          ...state.statusByContinent,
          ...action.continent,
        },
        shapes: {
          ...state.shapes,
          ...action.payload.reduce((obj, item) => ({
            ...obj,
            [item.countryId]: svgfy(item.shape),
          }), {}),
        },
      };
    default:
      return state;
  }
};

const fetchCountryShapeBegin = () => (
  {
    type: FETCH_SHAPE_BEGAN,
  }
);

const fetchCountryShapeFailure = (error) => (
  {
    type: FETCH_SHAPE_FAILED,
    error,
  }
);

const fetchCountryShapeSuccess = (payload, continent) => (
  {
    type: FETCH_SHAPE_SUCCEEDED,
    payload,
    continent: {
      [continent]: true,
    },
  }
);

export const fetchCountryShape = (countriesArr, continent) => async (dispatch) => {
  dispatch(fetchCountryShapeBegin());
  try {
    const shapes = countriesArr.map(async (item) => {
      if (!item.shapeId) return { countryId: item.id, shape: undefined };
      const response = await fetch(SHAPES_URL(item.shapeId), {
        headers: {
          'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja',
          'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH',
        },
      });
      if (!response.ok) throw Error(`${response.status} ${response.statusText}`);

      const { shape: { geoJson: data } } = await response.json();

      return {
        countryId: item.id,
        shape: data,
      };
    });
    dispatch(fetchCountryShapeSuccess(await Promise.all(shapes), continent));
  } catch (error) {
    dispatch(fetchCountryShapeFailure(error));
  }
};

export default reducer;
