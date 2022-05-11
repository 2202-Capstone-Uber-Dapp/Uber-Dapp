import axios from 'axios';

const initialState = {};

const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

const _setRider = (user) => {
  return {
    type: SET_USER,
    rider: user
  }
}

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/user/${userId}`);
      dispatch(_setUser(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export const updateUser = (userId, email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/user/${userId}`, {"email": email})
      dispatch(_updateUser(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    case UPDATE_USER: {
      return action.user
    }
    default:
      return state;
  }
}
