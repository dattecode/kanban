import "./LeftMenuStyles.css"
import { StructureDataHook } from "../../../hooks/StructureDataHook"
import { useEffect, useState } from "react";

const LeftMenuComponent = () => {
 const [prjData, setPrjData] = useState([])
  const { rStructureData } = StructureDataHook();

  const fetchData = async () => {
    const data = await rStructureData();
    console.log(data);
    
    setPrjData(data);
  }

  useEffect(() => { 
    fetchData();
  }, [])

  return (
    <div>
      <section>
        <h4>Proyectos</h4>
        <div>
          {prjData.map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </div>
      </section>
      <section>
        <h4>Rutinas</h4>
      </section>
      <section>
        <h4>Progresos</h4>
      </section>
    </div>
  )
}

export default LeftMenuComponent