import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { hoursCut } from "../../../../utils/hoursCut";
import { UseTask } from "../../../../hooks/UseTask";
import { StructureDataHook } from "../../../../hooks/StructureDataHook";
import { FormInput } from "../../../../hooks/FormInput";
import { useSelector } from "react-redux";
import { selectStructureById } from "../../../../Redux/structureSlice";
import "./formTaskStyles.css";
import { getPercentage } from "../../../../utils/getPercentage";

export const FormTaskModal = (props) => {
  const { id, changeModal } = props;
  const { handleSubmit, reset, register } = useForm();
  const [prioritySelect, setPrioritySelect] = useState("Baja");

  // hooks
  const { cTaskData } = UseTask();
  const { uStructureData } = StructureDataHook();
  const dataProject = useSelector(selectStructureById(id));
  const dataProgress = useSelector((state) => state.progressProject.data);

  //Form submit
  const onSubmit = async (data) => {
    const taskData = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      status: "Por hacer",
      priority: prioritySelect,
      dueDate: hoursCut(),
      projectId: id,
      progressId: "uuid" || "start" || "end",
    };

    const updateProject = {
      ...dataProject,
      completPorcentage: getPercentage(dataProject, dataProgress),
      startStackId: [...dataProject.startStackId, taskData.id],
    };

    await cTaskData(taskData);
    await uStructureData(id, updateProject);
    reset();
    changeModal();
  };

  return (
    <div>
      <h2>nueva tarea</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="title"
          type="text"
          placeholder="Titulo"
          register={register}
        />
        <FormInput
          name="description"
          type="text"
          placeholder="Descripcion"
          register={register}
        />
        <h2>{prioritySelect}</h2>
        <div className="priorities-task">
          <p onClick={() => setPrioritySelect("Baja")}>Baja</p>
          <p onClick={() => setPrioritySelect("Media")}>Media</p>
          <p onClick={() => setPrioritySelect("Alta")}>Alta</p>
        </div>
        <button type="submit">Crear</button>
      </form>
      <button onClick={changeModal}>Cerrar</button>
    </div>
  );
};
