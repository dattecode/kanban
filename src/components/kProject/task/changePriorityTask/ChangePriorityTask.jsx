import "./CPTStyles.css";
import { useSelector } from "react-redux";
import { selectedTaskById } from "../../../../Redux/taskSlice";
import { useEffect, useState } from "react";
import { UseTask } from "../../../../hooks/UseTask";
import { useForm } from "react-hook-form";
import { FormInput } from "../../../../hooks/FormInput";

export const ChangePriorityTask = (props) => {
  const { id, changeModal } = props;
  const { uTaskData } = UseTask();

  const [priority, setPriority] = useState(null);

  const data = useSelector(selectedTaskById(id));
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (dataForm) => {
    if (dataForm.title === "" && dataForm.description === "" && !priority) {
      changeModal();
      return;
    }

    const updateTask = {
      ...data,
      title: dataForm.title || data.title,
      description: dataForm.description || data.description,
      priority,
    };
    uTaskData(updateTask);
    changeModal();
  };

  useEffect(() => {
    if (data) {
      setPriority(data.priority);
    }
  }, [data]);

  return (
    <div className="modal-types">
      <div className="modal-types-container">
        <button onClick={changeModal}>X</button>
        <section>
          <div>
            <h4>Title: {data?.title}</h4>
            <h4>Description: {data?.description}</h4>
          </div>
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
              placeholder="Descriptcion"
              register={register}
            />
            <button type="submit" onClick={onSubmit}>
              Guardar
            </button>
          </form>
        </section>
        <section>
          <h4>Prioridad {priority}</h4>
          <div>
            <button onClick={() => setPriority("Baja")}>Baja</button>
            <button onClick={() => setPriority("Media")}>Media</button>
            <button onClick={() => setPriority("Alta")}>Alta</button>
          </div>
        </section>
      </div>
    </div>
  );
};
