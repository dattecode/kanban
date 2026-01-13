import "./styles.css";
import { totalStacks } from "../../../utils/totalStacks";
import { Link } from "react-router-dom";

export const Projects = (props) => {
  const { project } = props;

  return (
    <Link className="content-link" to={`/project/${project.id}`}>
      <div className="content-project">
        <h3>{project.title}</h3>
        <section>
          <p>{project.description}</p>
          <p>{totalStacks(project)}</p>
          <p>{project.startProject}</p>
        </section>
      </div>
    </Link>
  );
};
