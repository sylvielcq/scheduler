export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayItem => dayItem.name === day); // returns an array

  // If there is no filteredDay
  if (filteredDay.length === 0) {
    return [];
  }

  // filteredDay[0] as we want to look into the object inside of the filteredDay array
  const filteredAppointmentsID = filteredDay[0].appointments;

  // declaring a filteredAppointments array which will hold this day's appointments
  const filteredAppointments = [];


  filteredAppointmentsID.map(id => {
    filteredAppointments.push(state.appointments[id]);
  });

  // returns an array of appointments for the given day
  return filteredAppointments;
};