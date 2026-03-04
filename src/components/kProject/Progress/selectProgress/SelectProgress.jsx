import "./selectProStyles.css";
import { useSelector } from "react-redux";
import { selectProgressById } from "../../../../Redux/progressSlice";
import { TaskPrg } from "../TaskPrg/TaskPrg";

const SelectProgress = ({ progressId }) => {
  const dataProgress = useSelector(
    selectProgressById(progressId)
  );

  if (!dataProgress) {
    return (
      <div className="select-progress">
        <div className="sp-empty-wrapper">
          <p>No se encontró el progreso</p>
        </div>
      </div>
    );
  }

  return (
    <div className="select-progress">

      {/* 🔒 HEADER FIJO */}
      <div className="sp-header">
        <div className="sp-header-info">
          <h4 className="sp-title">
            {dataProgress.name ?? "Progreso"}
          </h4>
          <small className="sp-id">{progressId}</small>
        </div>
      </div>

      {/* 🔥 ÚNICO SCROLL REAL */}
      <div className="sp-tasks">
        {dataProgress.taskIds.length === 0 && (
          <p className="sp-empty">No hay tareas</p>
        )}

        {dataProgress.taskIds.map((item) => (
          <TaskPrg
            key={item}
            id={item}
            progressId={progressId}
          />
        ))}
      </div>

    </div>
  );
};

export default SelectProgress;