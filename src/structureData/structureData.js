//structure data for project and rutine
const structureProject = {
  id: "uuid",
  title: string,
  description: string,
  status: "inProgress" | "completed",
  startStackId: [],
  inProgressStack: [],
  completedStackId: [],
  completPorcentage: int,
  type: "rutine" | "project",
  startProject: Date,
  endStack: null,
};

//structure data for rutine complets
const rutineComplets = {
  id: "uuid",
  rutineId: "uuid",
  rutineComplets: int,
  lasDateComplets: Date,
};

//progress container structure data
const progressLengtContainter = {
  id: "uuid",
  name: string,
  lengthParentArray: int,
  taskIds: [],
};

//structure data for stack
const taskData = {
  id: "uuid",
  title: string,
  description: string,
  status: "To Do",
  priority: "Baja" | "Media" | "Alta",
  dueDate: Date,
  projectId: "uuid",
  progressId: "uuid" || "start" || "end",
};
