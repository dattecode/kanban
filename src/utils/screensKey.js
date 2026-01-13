import { FormTaskModal } from "../components/kProject/task/createTask/FormTaskModal";
import { FormProgressModal } from "../components/kProject/Progress/createProgress/FormProgressModal";


const bdKeys = {
  STRUCTURE_KEY: "STRUCTURE_KEY",
  RUTINE_COMPLETS_KEY: "RUTINE_COMPLETS_KEY",
  PROGREES_KEY: "PROGREES_KEY",
  TASK_KEY: "TASK_KEY",
};

const MODALS = {
  task: FormTaskModal,
  progress: FormProgressModal,
};

export const screensKey = {
  bdKeys,
  MODALS
}