import { UseCrud } from "./UseCrud";
import { useDispatch } from "react-redux";
import { setDataSliceRutine } from "../Redux/rutineSlice";
import { getRutineComplets, setRutineComplets } from "../dataBase/asyncStorage";

export const UseRutineCompletsHook = () => {
  const { create, read, update, deleted } = UseCrud({
    selector: (state) => state.rutineProject.data,
    setAction: setDataSliceRutine,
    persistFn: setRutineComplets,
  });

  const dispatch = useDispatch();

  const fetchRutineData = async () => {
    try {
      const data = await getRutineComplets();
      dispatch(setDataSliceRutine(data || []));
    } catch (error) {
      console.error(error);
    }
  };
  return {
    cRutineData: create,
    rRutineData: read,
    uRutineData: update,
    dRutineData: deleted,
    fetchRutineData,
  };
};
