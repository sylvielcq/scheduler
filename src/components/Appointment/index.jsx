import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Status from "./Status";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

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
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."}/>}
    </article>
  );
};