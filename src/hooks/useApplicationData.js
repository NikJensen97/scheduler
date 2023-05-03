import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  function updateSpots(state, appointments) {
    let result = [];
    for (let day of state.days) {
      let spots = 0;
      let dayAppointment = day.appointments;
      for (let app of Object.values(appointments)) {
        if (dayAppointment.includes(app.id)) {
          if (app.interview === null) {
            spots++;
          }
        }
      }
      result.push({ ...day, spots: spots });
    }

    return result;

  }
  const setDay = day => setState({ ...state, day });
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }));
    })

  }, []);
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`/api/appointments/${id}`, {
      interview
    }
    ).then(setState({
      ...state,
      appointments,
      days: updateSpots(state, appointments)
    }))
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments)
      })
    })
  }
  return {
    state: state,
    setDay: setDay,
    bookInterview: bookInterview,
    cancelInterview: cancelInterview
  }
}
