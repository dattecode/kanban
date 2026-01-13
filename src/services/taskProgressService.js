// services/taskProgressService.js

import { getPercentage } from "../utils/getPercentage";

export const taskProgressService = ({
  taskId,
  progressId,
  project,
  progressList,
}) => {
  const stack = project.inProgressStack;
  const index = stack.findIndex((id) => id === progressId);

  const isFirst = index <= 0;
  const isLast = index >= stack.length - 1;

  const moveTo = (targetProgressId) => {
    return progressList.map((progress) => {
      // remover del progress actual
      if (progress.id === progressId) {
        return {
          ...progress,
          taskIds: progress.taskIds.filter((t) => t !== taskId),
        };
      }

      // agregar al progress destino
      if (progress.id === targetProgressId) {
        return {
          ...progress,
          taskIds: progress.taskIds.includes(taskId)
            ? progress.taskIds
            : [...progress.taskIds, taskId],
        };
      }

      return progress;
    });
  };

  const movePrev = () => {
    if (isFirst) return null;
    return moveTo(stack[index - 1]);
  };

  const moveNext = () => {
    if (isLast) return null;
    return moveTo(stack[index + 1]);
  };

  const moveToCompleted = () => {
    const newProgressState = progressList.map((progress) =>
      progress.id === progressId
        ? {
            ...progress,
            taskIds: progress.taskIds.filter((t) => t !== taskId),
          }
        : progress
    );

    const newProject = {
      ...project,
      completPorcentage: getPercentage(project, newProgressState),
      completedStackId: project.completedStackId.includes(taskId)
        ? project.completedStackId
        : [...project.completedStackId, taskId],
    };

    return {
      progressState: newProgressState,
      projectState: newProject,
    };
  };

  return {
    isFirst,
    isLast,
    movePrev,
    moveNext,
    moveToCompleted,
  };
};
