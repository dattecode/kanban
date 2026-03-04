import React from "react";
import "./styles/modalStyles.css";
import { FormProgressModal } from "../components/kProject/Progress/createProgress/FormProgressModal";
import { FormTaskModal } from "../components/kProject/task/createTask/FormTaskModal";
import { ChangePriorityTask } from "../components/kProject/task/changePriorityTask/ChangePriorityTask";

export const UseModalHook = (props) => {
  const { id, changeModal, nameComponent: Component } = props;
  return (
    <>
      {
        <div className="modal-types">
          <div className="modal-types-container">
            <Component id={id} changeModal={changeModal} />
          </div>
        </div>
      }
    </>
  );
};
