import { useSelector } from "react-redux";
import { selectedTaskById } from "../../../Redux/taskSlice";
import "./taskStyles.css";
import { selectStructureById } from "../../../Redux/structureSlice";
import { selectProgressById } from "../../../Redux/progressSlice";
import { UseProgress } from "../../../hooks/UseProgress";
import { StructureDataHook } from "../../../hooks/StructureDataHook";
import { UseTask } from "../../../hooks/UseTask";
import { ChangePriorityTask } from "./changePriorityTask/ChangePriorityTask";
import { UseModalHook } from "../../../hooks/UseModalHook";
import { useState } from "react";

export const Task = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const data = useSelector(selectedTaskById(id));
  const dataProject = useSelector(selectStructureById(data.projectId));
  const dataProgress = useSelector(
    selectProgressById(dataProject?.inProgressStack[0])
  );

  const { uProgressData } = UseProgress();
  const { uStructureData } = StructureDataHook();
  const { uTaskData } = UseTask();

  const modeToProgress = async () => {
    if (!dataProgress) return;

    setIsMoving(true);

    setTimeout(async () => {
      const filterDataId = dataProject.startStackId.filter(
        (item) => item !== id
      );

      const updateProject = {
        ...dataProject,
        startStackId: filterDataId,
      };

      const updateProgress = {
        ...dataProgress,
        taskIds: [...dataProgress.taskIds, id],
      };

      const updateTask = {
        ...data,
        progressId: dataProgress.id,
        status: "in progress",
      };

      await uStructureData(updateProject.id, updateProject);
      await uProgressData(updateProgress.id, updateProgress);
      await uTaskData(updateTask.id, updateTask);

      setIsMoving(false);
    }, 300);
  };

  const priorityClass = `priority-${data.priority?.toLowerCase()}`;

  return (
    <>
      {showModal && (
        <UseModalHook
          nameComponent={ChangePriorityTask}
          changeModal={() => setShowModal(false)}
          id={id}
        />
      )}

      <div
        className={`task-container ${isMoving ? "moving" : ""}`}
      >
        <div className={`task-priority ${priorityClass}`}>
          {data.priority}
        </div>

        <section className="task-header">
          <p className="title-task">{data.title}</p>
          <div className="task-actions">
            <button onClick={() => setShowModal(true)}>⋯</button>
            {dataProject?.inProgressStack[0] && (
              <button onClick={modeToProgress}>→</button>
            )}
          </div>
        </section>

        <p className="description-task">
          {data.description}
        </p>
      </div>
    </>
  );
};