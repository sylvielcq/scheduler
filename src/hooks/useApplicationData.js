import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  // STATE
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  // API CALLS to get days and appointments data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    });
  }, []);



  // UPDATE CURRENT DAY IN STATE
  const setDay = day => setState({ ...state, day });



  // UPDATE AVAILABLE SPOTS FOR A SPECIFIC DAY
  const updateSpots = (state, appointments) => {
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    const currentDayObj = state.days[currentDayIndex];
    // Find available spots (where interview is null)
    const spots = currentDayObj.appointments.filter((id) => !appointments[id].interview).length;
    // copy of the currentDayObj, with the new value for available spots
    const updatedDayObj = { ...currentDayObj, spots };
    // copy of the current days array
    const updatedDays = [...state.days];
    // replace the current day object in our days array copy
    updatedDays[currentDayIndex] = updatedDayObj;
    // returns an array of days
    return updatedDays;
  };



  // BOOK INTERVIEW
  const bookInterview = (id, interview) => {
    // Updating each level of state, starting with the most nested one
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState((prev) => ({...prev, appointments, days}));
      });
  };



  // CANCEL INTERVIEW
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };



  // RETURN
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
  
};