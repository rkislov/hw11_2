import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICE_FAILURE,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  FETCH_SERVICES_REQUEST
} from '../actions/actionTypes'

const initialState = {
  item: { name: '', price: '', content: ''},
  loading: false,
  error: null,
  redirect: false,
};

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SERVICE_SUCCESS:
      const { item } = action.payload;
      return {
        item,
        loading: false,
        error: null,
        redirect: false,
      };
    case FETCH_SERVICE_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case UPDATE_SERVICE_FAILURE:
      const { updateError } = action.payload;
      return {
        ...state,
        loading: false,
        error: updateError,
      };
    case UPDATE_SERVICE_SUCCESS:
      return { 
        ...initialState,
        redirect: true,
       };
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const { elem } = state;
      return {
        ...state,
        item: {
          ...elem,
          [name]: value,
        }
      };
    case FETCH_SERVICES_REQUEST:
      return {
        ...state,
        redirect: false,
      };
    default:
      return state;
  }
}
