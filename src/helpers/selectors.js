export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(dayBooked => dayBooked.name === day);
  if (!selectedDay) {
    return [];
  }
  const appointments = selectedDay.appointments.map(id => state.appointments[id]);
  return appointments;
};


export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(dayBooked => dayBooked.name === day);
  if (!selectedDay) {
    return [];
  }
  const interviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  return interviewers;
};

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let theInterview = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interview.interviewer].id,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  }

  return theInterview;

};
