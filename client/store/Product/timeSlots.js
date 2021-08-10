import axios from 'axios';

// ACTION TYPE
const GET_TIME_SLOTS= 'GET_TIME_SLOTS';
const GET_TIME_SLOTS_FOR_DATES = 'GET_TIME_SLOTS_FOR_DATES'

// ACTION CREATOR
const getTimeSlots = timeslots => {
  return {
    type: GET_TIME_SLOTS,
    timeslots
  }
};

const getTimeSlotsForDates = selectedTimeSlots => {
  return {
    type: GET_TIME_SLOTS_FOR_DATES,
    selectedTimeSlots
  }
}

// THUNK CREATOR
export const fetchTimeSlots = id => {
  return async dispatch => {
    const { data } = await axios.get(`/api/productTimeSlot/?productId=${id}`);
    dispatch(getTimeSlots(data));
  };
};

export const fetchTimeSlotsForDates = (id, startDate, endDate) => {
  return async dispatch => {
    const { data } = await axios.get(`/api/productTimeSlot/?productId=${id}&startDate=${startDate}&endDate=${endDate}`);
    dispatch(getTimeSlotsForDates(data));
  };
};

// REDUCER
export default function timeSlotsReducer(state = [], action) {
  switch (action.type) {
    case GET_TIME_SLOTS:
      return action.timeslots;
    case GET_TIME_SLOTS_FOR_DATES:
    return action.selectedTimeSlots;
    default:
      return state;
  }
}
