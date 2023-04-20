import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {


  return (
    <>
      <Header
      time={props.time} />
      <article className="appointment"></article>
      {props.interview ? <Show interviewer={props.interview.interviewer.name} student={props.interview.student} /> : <Empty/>}
    </>
  )

}