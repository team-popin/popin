import axios from 'axios';

// ACTION TYPE
const GET_TIME_SLOTS= 'GET_TIME_SLOTS';
const GET_TIME_SLOTS_FOR_DATES = 'GET_TIME_SLOTS_FOR_DATES'
const ADD_TIME_SLOT="ADD_TIME_SLOT"

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

const addTimeSlot = timeslot => {
  return {
    type: ADD_TIME_SLOT,
    timeslot
  }
};

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

export const addTimeSlotForProduct = (dateTime, productId) => {
  return async dispatch => {
    const { data } = await axios.post(`/api/productTimeSlot`, {dateTime, productId});
    dispatch(addTimeSlot(data));
  };
};

// REDUCER
export default function timeSlotsReducer(state = [], action) {
  switch (action.type) {
    case GET_TIME_SLOTS:
      return action.timeslots;
    case GET_TIME_SLOTS_FOR_DATES:
    return action.selectedTimeSlots;
    case ADD_TIME_SLOT:
      return [...state, action.timeSlot];
    
    default:
      return state;
  }
}
