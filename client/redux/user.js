import axios from "axios";

const GET_RIDES = "GET_RIDES";
const ACCEPT_RIDE = "ACCEPT_RIDE";
const REQUEST_RIDE = "REQUEST_RIDE";

export const getRides = (rides) => {
  return {
    type: GET_RIDES,
    rides,
  };
};

export const _acceptRide = (ride) => {
  return {
    type: ACCEPT_RIDE,
    ride,
  };
};

export const _requestRide = (ride) => {
  return {
    type: REQUEST_RIDE,
    ride,
  };
};

export const fetchRides = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/ride/${id}`);
      dispatch(getRides(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const acceptRide = ({ rideId, userId }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/ride/${userId}`, rideId);
      dispatch(_acceptRide(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const requestRide = ({
  cost,
  distance,
  duration,
  userId,
}) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/ride/${userId}`, {
        cost,
        distance,
        duration,
      });
      dispatch(_requestRide(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Lets have only one requested ride at a time
//Check in backend for post routes?
// See if a riderUserId and isCompleted is false, if so they have a requested ride no more post routes
//send helpful message...
const initialState = {
  user: {},
  completedRides: [],
  requestedRide: {},
};

export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RIDES:
      return { ...state, completedRides: [...action.rides] };
    case ACCEPT_RIDE:
      //We just want to add an additional completed ride to our ride arr
      //Be Weary of overwriting the existing rides
      return { ...state, completedRides: [...action.ride] };
    case ACCEPT_RIDE:
      return { ...state, requestedRide: action.ride };
    default:
      return state;
  }
}
