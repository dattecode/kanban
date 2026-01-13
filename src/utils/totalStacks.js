
export const totalStacks = (project) =>{
  const {startStackId, inProgressStack, completedStackId} = project
  return startStackId.length + inProgressStack.length + completedStackId.length
}