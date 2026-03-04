import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStructureById } from "../../Redux/structureSlice";
import "./kprojectStyles.css";
import { useState } from "react";
import { Task } from "../../components/kProject/task/Task";
import { Progress } from "../../components/kProject/Progress/Progress";
import { UseModalHook } from "../../hooks/UseModalHook";
import { screensKey } from "../../utils/screensKey";
import LeftMenuComponent from "../../components/kProject/leftMenu/LeftMenuComponent";

export const KProject = () => {
  const { id } = useParams();
  const dataProject = useSelector(selectStructureById(id));

  const [modalComponent, setModalComponent] = useState(null);

  const openModal = (Component) => {
    setModalComponent(() => Component);
  };

  const closeModal = () => {
    setModalComponent(null);
  };

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

      <div className="app-container">
        <header className="kproject-navbar">
          <p>Navbar</p>
        </header>

        <main className="kproject-container">
          <aside className="left-menu-app">
            <LeftMenuComponent />
          </aside>

          <section className="kproject-section">
            <article className="kproject-info">
              <h3 className="kproject-info-title">
                {dataProject.title}
              </h3>
              <p className="kproject-info-text">
                {dataProject.description}
              </p>
              <p className="kproject-info-date">
                {dataProject.startProject}
              </p>
            </article>

            <section className="kproject-progress">
              {/* POR HACER */}
              <section className="kproject-tasks">
                <div className="kproject-to-do">
                  <h2>Por hacer</h2>
                  <button onClick={() => openModal(screensKey.MODALS.task)}>
                    +
                  </button>
                </div>

                <div className="kp-active">
                  {dataProject.startStackId.map((task) => (
                    <Task key={task} id={task} />
                  ))}
                </div>
              </section>

              {/* EN PROGRESO */}
              <section className="kproject-in-progress">
                <div className="kproject-progress-to-do">
                  <h2>En progreso</h2>
                  <button
                    onClick={() => openModal(screensKey.MODALS.progress)}
                  >
                    +
                  </button>
                </div>

                <div className="kp-active">
                  <Progress progressId={dataProject.inProgressStack} />
                </div>
              </section>

              {/* COMPLETADO */}
              <section className="kproject-completed">
                <div className="kproject-completed-to-do">
                  <h2>Completado</h2>
                </div>

                <div className="kp-active">
                  {dataProject.completedStackId.map((task) => (
                    <p key={task}>{task}</p>
                  ))}
                </div>
              </section>
            </section>
          </section>
        </main>
      </div>
    </>
  );
};