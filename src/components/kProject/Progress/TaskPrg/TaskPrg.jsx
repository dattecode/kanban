import { useSelector } from "react-redux";
import { selectedTaskById } from "../../../../Redux/taskSlice";
import { selectStructureById } from "../../../../Redux/structureSlice";
import { useEffect, useState } from "react";
import { UseProgress } from "../../../../hooks/UseProgress";
import { StructureDataHook } from "../../../../hooks/StructureDataHook";
import { taskProgressService } from "../../../../services/taskProgressService";

export const TaskPrg = ({ id, progressId }) => {
  const [prgInstack, setPrgInstack] = useState(null);

  const dataTask = useSelector(selectedTaskById(id));
  const dataProject = useSelector(selectStructureById(dataTask.projectId));
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
      dataProject.inProgressStack.findIndex((id) => id === progressId)
    );
  }, [dataProject, progressId]);

  return (
    <div className="task-prg">
      <section className="task-prg-nav">
        {!service.isFirst && <button onClick={prevProgress}>prev</button>}
        <h3>TaskPrg</h3>
        <div>
          {!service.isLast ? (
            <button onClick={nextProgress}>next</button>
          ) : (
            <button onClick={completeTask}>completed</button>
          )}
        </div>
      </section>

      <p>{dataTask.title}</p>
      <p>{dataTask.description}</p>
      <p>{dataTask.priority}</p>
      <p>{dataTask.id}</p>
    </div>
  );
};
