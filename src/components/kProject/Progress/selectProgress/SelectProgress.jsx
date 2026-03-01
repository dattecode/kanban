import "./selectProStyles.css";
import { useSelector } from "react-redux";
import { selectProgressById } from "../../../../Redux/progressSlice";
import { TaskPrg } from "../TaskPrg/TaskPrg";

const SelectProgress = ({ progressId }) => {
  const dataProgress = useSelector(selectProgressById(progressId));

  if (!dataProgress) return null;

  return (
    <div className="select-progress">

      {/* HEADER */}
      <div className="sp-header">
        <h4>{dataProgress.name ?? "Progreso"}</h4>
        <small>{progressId}</small>
      </div>

      {/* TASKS (SCROLL) */}
      <div className="sp-tasks">
        {dataProgress.taskIds.length === 0 && (
          <p className="sp-empty">No hay tareas</p>
        )}

        {dataProgress.taskIds.map((item) => (
          <TaskPrg key={item} id={item} progressId={progressId} />
        ))}
      </div>

    </div>
  );
};

export default SelectProgress;
