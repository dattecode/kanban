import "./LeftMenuStyles.css";
import { StructureDataHook } from "../../../hooks/StructureDataHook";
import { UseRutineCompletsHook } from "../../../hooks/UseRutineCompletsHook";
import { UseProgress } from "../../../hooks/UseProgress";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeftMenuComponent = () => {
  const [prjData, setPrjData] = useState([]);
  const [rutineData, setRutineData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [filteredProgress, setFilteredProgress] = useState([]);
  
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  const { rStructureData } = StructureDataHook();
  const { rRutineData } = UseRutineCompletsHook();
  const { rProgressData, uProgressData } = UseProgress();

  const fetchAllData = async () => {
    try {
      const projects = await rStructureData();
      const rutines = await rRutineData();
      const progress = await rProgressData();

      setPrjData(projects || []);
      setRutineData(rutines || []);
      setProgressData(progress || []);

      // Filtrar progreso del proyecto actual
      if (projectId && projects) {
        const project = projects.find((p) => p.id === projectId);
        setCurrentProject(project);
        
        if (project && progress) {
          const projectProgress = progress.filter((p) =>
            project.inProgressStack?.includes(p.id)
          );
          setFilteredProgress(projectProgress);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [projectId]);

  const getStatusIndicator = (status) => {
    return <span className={`status-indicator ${status}`} />;
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleProgressClick = async (progressId) => {
    const progress = filteredProgress.find((p) => p.id === progressId);
    if (progress) {
      const updatedProgress = {
        ...progress,
        lengthParentArray: (progress.lengthParentArray || 0) + 1,
      };
      await uProgressData(progressId, updatedProgress);
      fetchAllData();
    }
  };

  return (
    <div className="left-menu-section">
      {/* Proyectos Section */}
      <section>
        <h3>Proyectos</h3>
        <div className="left-menu-items">
          {prjData && prjData.length > 0 ? (
            prjData.map((item) => (
              <div
                key={item.id}
                className="left-menu-item"
                onClick={() => handleProjectClick(item.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="left-menu-item-title">
                  {getStatusIndicator(item.status)}
                  {item.title}
                </div>
                <span className="left-menu-item-type" title={item.type}>
                  {item.type}
                </span>
              </div>
            ))
          ) : (
            <p className="left-menu-empty">No hay proyectos</p>
          )}
        </div>
      </section>

      {/* Rutinas Section */}
      <section>
        <h4>Rutinas Completadas</h4>
        <div className="left-menu-items">
          {rutineData && rutineData.length > 0 ? (
            rutineData.map((item) => (
              <div key={item.id} className="left-menu-item">
                <div className="left-menu-item-title">
                  Rutina #{item.id?.slice(0, 8)}
                </div>
                <span className="left-menu-item-badge">
                  {item.rutineComplets || 0}
                </span>
              </div>
            ))
          ) : (
            <p className="left-menu-empty">No hay rutinas</p>
          )}
        </div>
      </section>

      {/* Progresos Section */}
      <section>
        <h4>Progresos</h4>
        <div className="left-menu-items">
          {filteredProgress && filteredProgress.length > 0 ? (
            filteredProgress.map((item) => (
              <div
                key={item.id}
                className="left-menu-item"
                onClick={() => handleProgressClick(item.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="left-menu-item-title">
                  {item.name || "Progreso"}
                </div>
                <span className="left-menu-item-badge">
                  {item.lengthParentArray || 0}
                </span>
              </div>
            ))
          ) : (
            <p className="left-menu-empty">No hay progresos</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LeftMenuComponent;