import { useForm } from "react-hook-form";
import { FormInput } from "../../../hooks/FormInput";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { hoursCut } from "../../../utils/hoursCut";
import { StructureDataHook } from "../../../hooks/StructureDataHook";
import { UseRutineCompletsHook } from "../../../hooks/UseRutineCompletsHook";

export const CreateStackModal = (props) => {
  const { type } = props;
  //packages
  const { handleSubmit, reset, register } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //custom hooks
  const { cStructureData } = StructureDataHook();
  const { cRutineData } = UseRutineCompletsHook();

  const onSubmit = async (data) => {
    
    setIsSubmitting(true);
    
    const structureProject = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      status: "inProgress",
      startStackId: [],
      inProgressStack: [],
      completedStackId: [],
      completPorcentage: 0,
      type,
      startProject: hoursCut(),
      endStack: null,
    };

    if (type === "rutine") {
      const rutineComplets = {
        id: uuidv4(),
        rutineId: structureProject.id,
        rutineComplets: 0,
        lasDateComplets: structureProject.startProject,
      };
      await cRutineData(rutineComplets);
    }

    await cStructureData(structureProject);
    setIsSubmitting(false);
    reset();
    console.log("project created");
  };

  return (
    <section>
      <h2>Crear nuevo {type}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="title"
          register={register}
          placeholder="Título"
          type="text"
          maxL={20}
        ></FormInput>
        <FormInput
          name="description"
          register={register}
          placeholder="Descripción"
          type="text"
          maxL={50}
        ></FormInput>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? `Creando...` : `Crear ${type}`}
        </button>
      </form>
    </section>
  );
};
