import { useForm } from "react-hook-form";
import "./formProgreStyle.css";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "../../../../hooks/FormInput";
import { useSelector } from "react-redux";
import { selectStructureById } from "../../../../Redux/structureSlice";
import { UseProgress } from "../../../../hooks/UseProgress";
import { StructureDataHook } from "../../../../hooks/StructureDataHook";

export const FormProgressModal = (props) => {
  const { id, changeModal } = props;

  const { handleSubmit, reset, register } = useForm();

  const dataProject = useSelector(selectStructureById(id));
  const { cProgressData} = UseProgress();
  const { uStructureData } = StructureDataHook();
  
  const onSubmit = async (data) => {

    const lengthParentArray = dataProject.inProgressStack.length;
    const int = parseInt(lengthParentArray);

    const progressLengtContainter = {
      id: uuidv4(),
      name: data.name,
      lengthParentArray: int,
      taskIds: [],
    };

    const updateProjectData = {
      ...dataProject,
      inProgressStack: [...dataProject.inProgressStack, progressLengtContainter.id],
    }

    await cProgressData(progressLengtContainter);
    await uStructureData(id, updateProjectData);
    reset();
    changeModal();
  };

  return (
    <div className="progress-container">
      <p>FormProgressModal</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          type="text"
          placeholder="Titulo"
          register={register}
        />
        <button type="submit">Guardar</button>
      </form>
      <button onClick={changeModal}>Cerrar</button>
    </div>
  );
};
