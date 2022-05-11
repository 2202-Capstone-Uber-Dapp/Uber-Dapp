import axios from 'axios';

const initialState = {};

const SET_RIDER = "SET_RIDER";
const UPDATE_USER = "UPDATE_USER";

const _setRider = (rider) => {
  return {
    type: SET_RIDER,
    rider
  }
}

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}
export const fetchRider = (riderId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/user/${riderId}`);
      dispatch(_setRider(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export const updateUser = (userId, email) => {
  return async (dispatch) => {
    try {
      console.log(email);
      const { data } = await axios.put(`/api/user/${userId}`, {"email": email})
      console.log(data);
      dispatch(_updateUser(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RIDER: {
      return action.rider;
    }
    case UPDATE_USER: {
      return action.user
    }
    default:
      return state;
  }
}
