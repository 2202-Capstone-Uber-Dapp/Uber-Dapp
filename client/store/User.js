import axios from 'axios';

const initialState = {};

const SET_RIDER = "SET_RIDER";

const _setRider = (rider) => {
  return {
    type: SET_RIDER,
    rider
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

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RIDER: {
      return state;
    }
    default:
      return state;
  }
}
