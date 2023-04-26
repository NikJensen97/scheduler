import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = "SAVING";
const CONFIRM = 'CONFIRM';

let message;
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    message = 'Saving...';
    transition(SAVING);
    props.bookInterview(props.id, interview).then(

      setTimeout(function () { transition(SHOW) }, 1000));
  }

  function deleteAppointment() {
 
    message = 'Deleting...';
    transition(SAVING);

    setTimeout(function () {
      props.cancelInterview(props.id).then(
        transition(EMPTY)
      )
    }, 1000)
  }
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
          onSave={save}

        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message={message} />}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)}
        onConfirm={deleteAppointment}
        message={'Are you sure you would like to delete?'}
      />}
    </>
  )

}