import { UseCrud } from "./UseCrud";
import { useDispatch } from "react-redux";
import { getTaskData, setTaskData } from "../dataBase/asyncStorage";
import { setDataSliceTask } from "../Redux/taskSlice";

export const UseTask = () => {
  const { create, read, update, deleted } = UseCrud({
    selector: (state) => state.taskProject.data,
    setAction: setDataSliceTask,
    persistFn: setTaskData,
  });

  const dispatch = useDispatch();

  const fetchTaskData = async () => {
    try {
      const data = await getTaskData();
      dispatch(setDataSliceTask(data || []));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    cTaskData: create,
    rTaskData: read,
    uTaskData: update,
    dTaskData: deleted,
    fetchTaskData,
  };
};
