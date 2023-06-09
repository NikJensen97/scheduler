import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteAppointment() {
    transition(DELETING, true);


    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  return (
    <>
      <Header
        time={props.time} />
      <article className="appointment" data-testid="appointment"></article>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={save}

        />)}
      {mode === EDIT && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)}
        onConfirm={deleteAppointment}
        message={'Are you sure you would like to delete?'}
      />}
      {mode === ERROR_DELETE && <Error message="There was an error deleting your appointment" onClose={back} />}
      {mode === ERROR_SAVE && <Error message="There was an error saving your appointment" onClose={back} />}
    </>
  )

}