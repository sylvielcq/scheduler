import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";

  // Calling our useVisualMode selector and initializing mode based on props.interview
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onCancel = () => back();

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };
  
  const onDelete = () => {
    transition(CONFIRM);
  };

  const confirm = () => {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then(() =>  transition(EMPTY));
  };

  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === DELETE && <Status message={"Deleting"}/>}
      {mode === CONFIRM && (
      <Confirm 
        message={"Are you sure you would like to delete?"}
        onCancel={onCancel}
        onConfirm={confirm}
      />
      )}
    </article>
  );
};