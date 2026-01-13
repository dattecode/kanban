import { useEffect, useState } from "react";
import { CreateStackModal } from "../../components/home/createStack/CreateStackModal";
import "./homeStyle.css";
import { useSelector } from "react-redux";
import { Projects } from "../../components/home/projects/Projects";

const Home = () => {
  const [type, setType] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const projectsData = useSelector((state) => state.structureProject.data);

  const handleModalShow = () => {
    setModalOn(!modalOn);
  };

  const createProject = () => {
    setType("project");
    handleModalShow();
  };

  const createRutine = () => {
    setType("rutine");
    handleModalShow();
  };

  useEffect(() => {
    // loading initial data if necessary
  }, []);
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title-header">Bievenido a Revoltra</h1>
      </header>

      <section className="Create-project-section">
        <button className="create-project-button" onClick={createProject}>
          Crear Proyecto +
        </button>

        <button className="create-project-button" onClick={createRutine}>
          Crear rutina +
        </button>
      </section>

      {modalOn && (
        <section className="modal-create-stack">
          {<CreateStackModal type={type} />}
        </section>
      )}

      <section className="projects-section">
        {projectsData?.map((project) => {
          return (
            <div key={project.id}>
              <Projects project={project} />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
