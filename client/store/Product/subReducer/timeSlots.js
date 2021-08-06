import axios from 'axios';

// ACTION TYPE
const GET_TIME_SLOTS= 'GET_TIME_SLOTS';

// ACTION CREATOR
const getTimeSlots = timeslots => {
  return {
    type: GET_TIME_SLOTS,
    timeslots
  }
};

// THUNK CREATOR
export const fetchTimeSlots = id => {
  return async dispatch => {
    const { data } = await axios.get(`/api/productTimeSlot/?productId=${id}`);
    dispatch(getTimeSlots(data));
  };
};

// REDUCER
export default function timeSlotsReducer(state = {}, action) {
  switch (action.type) {
    case GET_TIME_SLOTS:
      return action.timeslots;
    default:
      return state;
  }
}
