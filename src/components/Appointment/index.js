import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <>
      <Header
        time={props.time} />
      <article className="appointment"></article>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
      <Form
      onCancel={() => back()}
      interviewers={props.interviewers}
      
      />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
    </>
  )

}