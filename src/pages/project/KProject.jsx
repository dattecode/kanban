import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStructureById } from "../../Redux/structureSlice";
import "./kprojectStyles.css";
import { useState } from "react";
import { Task } from "../../components/kProject/task/Task";
import { Progress } from "../../components/kProject/Progress/Progress";
import { UseModalHook } from "../../hooks/UseModalHook";
import { screensKey } from "../../utils/screensKey";

export const KProject = () => {
  //project data
  const { id } = useParams();
  const dataProject = useSelector(selectStructureById(id));

  //close modals
  const [modalComponent, setModalComponent] = useState(null);

  const openModal = (Component) => {
    setModalComponent(() => Component);
  };

  const closeModal = () => {
    setModalComponent(null);
  };

  //loading initial data
  if (!dataProject) {
    return <p>Cargando proyecto...</p>;
  }

  return (
    <>
      {modalComponent && (
        <UseModalHook
          id={id}
          changeModal={closeModal}
          nameComponent={modalComponent}
        />
      )}

      <div className="kproject-container">
        <div className="kproject-navbar">
          <p>Navbar</p>
        </div>

        <div className="app-container">
          <section className="left-menu-app"></section>

          <section className="kproject-section">
            <article className="kproject-info">
              <h3>{dataProject.title}</h3>
              <p>{dataProject.description}</p>
              <p>{dataProject.startProject}</p>
            </article>

            <section className="kproject-progress">
              <section className="kproject-tasks">
                <div className="kproject-to-do">
                  <h2>Por hacer</h2>
                  <button onClick={() => openModal(screensKey.MODALS.task)}>
                    +
                  </button>
                </div>
                <section className="kp-active">
                  {dataProject.startStackId.map((task) => (
                    <Task key={task} id={task} />
                  ))}
                </section>
              </section>

              <section className="kproject-in-progress">
                <div className="kproject-progress-to-do">
                  <h2>En progreso</h2>
                  <button onClick={() => openModal(screensKey.MODALS.progress)}>
                    +
                  </button>
                </div>
                <section className="kp-active">
                  {dataProject.inProgressStack.map((task) => (
                    <Progress key={task} id={task} />
                  ))}
                </section>
              </section>

              <section className="kproject-completed">
                <div className="kproject-completed-to-do">
                  <h2>Completado</h2>
                </div>
                <section className="kp-active">
                  {dataProject.completedStackId.map((task) => (
                    <p key={task}>{task}</p>
                  ))}
                </section>
              </section>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};
