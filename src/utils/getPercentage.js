export const getPercentage = (project, progress) => {
  if (!project || !progress) return 0;

  const startTasks = project.startStackId?.length ?? 0;

  const progressTasks = progress.reduce(
    (acc, p) => acc + p.taskIds.length,
    0
  );

  const completedTasks = project.completedStackId?.length ?? 0;

  const totalTasks = startTasks + progressTasks + completedTasks;

  if (totalTasks === 0) return 0;

  const percentage = (completedTasks / totalTasks) * 100;

  return Number(percentage.toFixed(0));
};
