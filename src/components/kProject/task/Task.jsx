import { useSelector } from "react-redux";
import { selectedTaskById } from "../../../Redux/taskSlice";
import "./taskStyles.css";
import { selectStructureById } from "../../../Redux/structureSlice";
import { selectProgressById } from "../../../Redux/progressSlice";
import { UseProgress } from "../../../hooks/UseProgress";
import { StructureDataHook } from "../../../hooks/StructureDataHook";
import { UseTask } from "../../../hooks/UseTask";

export const Task = (props) => {
  const { id } = props;

  //selectors
  const data = useSelector(selectedTaskById(id));
  const dataProject = useSelector(selectStructureById(data.projectId));
  const dataProgress = useSelector(
    selectProgressById(dataProject?.inProgressStack[0])
  );
  //hooks
  const { uProgressData } = UseProgress();
  const { uStructureData } = StructureDataHook();
  const { uTaskData } = UseTask();

  const modeToProgress = async () => {
    if (!dataProgress) {
      console.warn("No hay progreso creado todavía");
      return;
    }

    const filterDataId = dataProject.startStackId.filter((item) => item !== id);

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
  };

  return (
    <div className="task-container">
      <p>{data.priority}</p>
      <section className="task-header">
        <p className="title-task">{data.title}</p>
        <div>
          <button>Ó</button>
          {dataProject?.inProgressStack[0] && (
            <button onClick={modeToProgress}>Next</button>
          )}
        </div>
      </section>
      <p className="description-task">
        {data.description}, {data.id}
      </p>
    </div>
  );
};
