export function getAppointmentsForDay(state, day) {
  let filteredDay = state.days.filter(days => days.name === day);
  if (filteredDay.length === 0) {
    return filteredDay;
  }
  let appointments = [];
  const ids = filteredDay[0].appointments;
  for (let y = 0; y < ids.length; y++){
    appointments.push(state.appointments[ids[y]])

  }
  return appointments;
}