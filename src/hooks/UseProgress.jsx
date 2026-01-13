import { UseCrud } from "./UseCrud";
import { setProgressContainer, getProgressContainer } from "../dataBase/asyncStorage";
import { useDispatch } from "react-redux";
import { setDataSliceProgress } from "../Redux/progressSlice";

export const UseProgress = () => {
  const { create, read, update, deleted } = UseCrud({
    selector: (state) => state.progressProject.data,
    setAction: setDataSliceProgress,
    persistFn: setProgressContainer,
  });
  const dispatch = useDispatch();

  const fetchProgressData = async () => {
    try {
      const data = await getProgressContainer();
      dispatch(setDataSliceProgress(data || []));
    } catch (error) {
      console.error(error);
    }
  };

  const replaceAll = async (newData) =>{
    dispatch(setDataSliceProgress(newData));
    await setProgressContainer(newData);
  }

  return {
    cProgressData: create,
    rProgressData: read,
    uProgressData: update,
    dProgressData: deleted,
    fetchProgressData,
    replaceAll
  };
};
