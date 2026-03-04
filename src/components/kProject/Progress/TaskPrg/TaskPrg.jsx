import { useSelector } from "react-redux";
import { selectedTaskById } from "../../../../Redux/taskSlice";
import { selectStructureById } from "../../../../Redux/structureSlice";
import { useEffect, useState } from "react";
import { UseProgress } from "../../../../hooks/UseProgress";
import { StructureDataHook } from "../../../../hooks/StructureDataHook";
import { taskProgressService } from "../../../../services/taskProgressService";
import { UseModalHook } from "../../../../hooks/UseModalHook";
import { ChangePriorityTask } from "../../task/changePriorityTask/ChangePriorityTask";
import "./taskPrgStyles.css";

export const TaskPrg = ({ id, progressId }) => {
  const [prgInstack, setPrgInstack] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => setShowEdit(!showEdit);

  const dataTask = useSelector(selectedTaskById(id));
  const dataProject = useSelector(selectStructureById(dataTask?.projectId));
  const dataProgress = useSelector((state) => state.progressProject.data);

  const { replaceAll } = UseProgress();
  const { uStructureData } = StructureDataHook();

  const service = taskProgressService({
    taskId: id,
    progressId,
    project: dataProject,
    progressList: dataProgress,
  });

  const prevProgress = async () => {
    const newState = service.movePrev();
    if (newState) await replaceAll(newState);
  };

  const nextProgress = async () => {
    const newState = service.moveNext();
    if (newState) await replaceAll(newState);
  };

  const completeTask = async () => {
    const result = service.moveToCompleted();
    if (!result) return;

    await replaceAll(result.progressState);
    await uStructureData(dataProject.id, result.projectState);
  };

  useEffect(() => {
    if (!dataProject) return;
    setPrgInstack(
      dataProject.inProgressStack.findIndex((pid) => pid === progressId)
    );
  }, [dataProject, progressId]);

  if (!dataTask) return null;

  const priorityClass = `priority-${dataTask.priority?.toLowerCase()}`;

  return (
    <>
      {showEdit && (
        <UseModalHook
          id={id}
          changeModal={handleShowEdit}
          nameComponent={ChangePriorityTask}
        />
      )}

      <div className="task-prg-card">
        <div className="task-prg-header">
          <span className={`task-priority ${priorityClass}`}>
            {dataTask.priority}
          </span>

          <button className="task-menu-btn" onClick={handleShowEdit}>
            ⋯
          </button>
        </div>

        <h4 className="task-prg-title">{dataTask.title}</h4>

        <p className="task-prg-description">
          {dataTask.description}
        </p>

        <div className="task-prg-footer">
          {!service.isFirst && (
            <button className="btn-nav" onClick={prevProgress}>
              ←
            </button>
          )}

          {!service.isLast ? (
            <button className="btn-nav primary" onClick={nextProgress}>
              →
            </button>
          ) : (
            <button className="btn-nav success" onClick={completeTask}>
              ✔
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskPrg;