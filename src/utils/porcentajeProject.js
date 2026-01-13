export const porcentajeProject = (
  completedStackId = [],
  progressId,
  totalStacks = 0
) => {
  const completedCountBase = Array.isArray(completedStackId)
    ? completedStackId.length
    : 0;
  let completedCount = completedCountBase;

  if (progressId === "inProgress") {
    completedCount += 1;
  }

  if (!totalStacks || totalStacks <= 0) return 0;

  const percent = (completedCount / totalStacks) * 100;
  return parseFloat(percent.toFixed(2));
};
