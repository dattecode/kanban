import { useSelector } from "react-redux";
import "./progressStyle.css";
import { selectProgressById } from "../../../Redux/progressSlice";
import { TaskPrg } from "./TaskPrg/TaskPrg";

export const Progress = (props) => {
  const { id } = props;

  const dataProgress = useSelector(selectProgressById(id));
  
  return (
    <div className="pro-cont">
      Progress
      <h4>{id}</h4>
      <h3>{dataProgress.name}</h3>
      <section className="pro-tasks">
        {dataProgress.taskIds.map((item) => (
          <TaskPrg id={item} key={item} progressId={id}/>
        ))}
      </section>
    </div>
  )
}
