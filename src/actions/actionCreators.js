import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  REMOVE_SERVICE,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServiceFailure = error => ({
  type: FETCH_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchServiceSuccess = item => ({
  type: FETCH_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeServiceRequest = id => ({
  type: REMOVE_SERVICE,
  payload: {
    id,
  },
});

export const fetchServiceRequest = id => ({
  type: FETCH_SERVICE_REQUEST,
});

export const removeService = (id) => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(saveServiceSuccess());
  } catch (e) {
    dispatch(saveServiceFailure(e.message));
  }
  // fetchServices(dispatch);
  dispatch(fetchServices());
}

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
}

export const fetchService = (id) => async (dispatch) => {
  dispatch(fetchServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServiceSuccess(data));
  } catch (e) {
    dispatch(fetchServiceFailure(e.message));
  }
}

export const saveServiceRequest = (name, price, content) => ({
  type: UPDATE_SERVICE_REQUEST,
  payload: {
    name,
    price,
    content
  },
})

export const saveServiceFailure = error => ({
  type: UPDATE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const saveServiceSuccess = () => ({
  type: UPDATE_SERVICE_SUCCESS,
});

export const saveService = (id, name, price, content) => async (dispatch) => {
  dispatch(saveServiceRequest());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, price, content }),
    })    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(saveServiceSuccess());
  } catch (e) {
    dispatch(saveServiceFailure(e.message));
  }
}
