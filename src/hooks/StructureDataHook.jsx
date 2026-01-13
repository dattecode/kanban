import { UseCrud } from "./UseCrud";
import { setStructureData, getStructureData } from "../dataBase/asyncStorage";
import { setDataSliceStructure } from "../Redux/structureSlice";
import { useDispatch } from "react-redux";

export const StructureDataHook = () => {
  const { create, read, update, deleted } = UseCrud({
    selector: (state) => state.structureProject.data,
    setAction: setDataSliceStructure,
    persistFn: setStructureData,
  });

  const dispatch = useDispatch();

  const fetchStructureData = async () => {
    try {
      const data = await getStructureData();
      dispatch(setDataSliceStructure(data || []));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    cStructureData: create,
    rStructureData: read,
    uStructureData: update,
    dStructureData: deleted,
    fetchStructureData,
  };
};
