import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT;"
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Calling our useVisualMode selector and initializing mode based on props.interview
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // SAVE
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  // DESTROY
  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() =>  transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  // EDIT
  const edit = () => {
    transition(EDIT);
  };

  // DELETE
  const onDelete = () => transition(CONFIRM);

  // CANCEL
  const onCancel = () => back();

  // CLOSE
  const onClose = () => back();


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={edit}
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
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM && (
        <Confirm 
          message={"Are you sure you would like to delete?"}
          onCancel={onCancel}
          onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={"Could not save appointment."} 
          onClose={onClose}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"Could not delete appointment."} 
          onClose={onClose}
        />
      )}
    </article>
  );
};