import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { KProject } from "./pages/project/KProject";
import { StructureDataHook } from "./hooks/StructureDataHook";
import { UseRutineCompletsHook } from "./hooks/UseRutineCompletsHook";
import { UseProgress } from "./hooks/UseProgress";
import { UseTask } from "./hooks/UseTask";

function App() {
  const { fetchStructureData } = StructureDataHook();
  const { fetchRutineData } = UseRutineCompletsHook();
  const { fetchProgressData } = UseProgress();
  const { fetchTaskData } = UseTask();

  useEffect(() => {
    //loading initial data if necessary
    fetchStructureData();
    fetchRutineData();
    fetchProgressData();
    fetchTaskData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<KProject />} />
    </Routes>
  );
}

export default App;
