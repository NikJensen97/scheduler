import React from "react";
import Button from "components/Button.js";
/* .add("Confirm", () => (
    <Confirm
    message={"Delete the appointment?"}
    onConfirm={action("onConfirm")}
    onCancel={action("onCancel")}
    />)); */
export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>

  )
}