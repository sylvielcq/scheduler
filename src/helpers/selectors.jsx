// ------- GET APPOINTMENTS FOR DAY ------- 
// Takes in a state object, and a day string
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayItem => dayItem.name === day); // returns an array

  // If there is no filteredDay, return an emmpty array
  if (filteredDay.length === 0) {
    return [];
  }

  // Else... filteredDay[0] as we want to look into the object inside of the filteredDay array
  const filteredAppointmentsID = filteredDay[0].appointments;

  // declaring a filteredAppointments array which will hold this day's appointments
  const filteredAppointments = [];


  filteredAppointmentsID.forEach(id => {
    filteredAppointments.push(state.appointments[id]);
  });

  // returns an array of appointments for the given day
  return filteredAppointments;
};


// ------- GET INTERVIEWERS FOR DAY ------- 
// Takes in a state object, and a day string
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(dayItem => dayItem.name === day); // returns an array containing a Day object

  // If there is no filteredDay, return an empty array
  if (filteredDay.length === 0) {
    return [];
  }

  // Else... filteredDay[0] as we want to look into the object inside of the filteredDay array
  const filteredInterviewersID = filteredDay[0].interviewers;

  // declaring a filteredInterviewers array which will hold this day's interviewers
  const filteredInterviewers = [];


  filteredInterviewersID.forEach(id => {
    filteredInterviewers.push(state.interviewers[id]);
  });

  // returns an array of interviewers for the given day
  return filteredInterviewers;
};


// -------  GET INTERVIEW ------- 
// Takes in a state object, and an interview object
export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  
  return {
    student: interview.student,
    interviewer: { ...state.interviewers[interviewerId] }
  };
};