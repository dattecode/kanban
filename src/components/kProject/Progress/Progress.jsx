import "./progressStyle.css";
import { useState } from "react";
import SelectProgress from "./selectProgress/SelectProgress";

export const Progress = ({ progressId = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectNewId = (index, progress, next = true) => {
    if (!progress || progress.length === 0) return;

    const condition = next
      ? index < progress.length - 1
      : index > 0;

    const nextIndex = next
      ? condition
        ? index + 1
        : progress.length - 1
      : condition
        ? index - 1
        : 0;

    setSelectedIndex(nextIndex);
  };

  if (!progressId.length) {
    return (
      <div className="pro-wrapper">
        <div className="pro-empty">
          No hay progreso disponible
        </div>
      </div>
    );
  }

  return (
    <div className="pro-wrapper">

      {/* 🔒 CONTROLES FIJOS */}
      <div className="pro-controls">
        <button
          onClick={() =>
            selectNewId(selectedIndex, progressId, false)
          }
          disabled={selectedIndex === 0}
        >
          Anterior
        </button>

        <span className="pro-index">
          {selectedIndex + 1} / {progressId.length}
        </span>

        <button
          onClick={() =>
            selectNewId(selectedIndex, progressId, true)
          }
          disabled={selectedIndex === progressId.length - 1}
        >
          Siguiente
        </button>
      </div>

      {/* 🔒 CONTENIDO DINÁMICO CON SCROLL INTERNO */}
      <div className="pro-cont">
        <SelectProgress progressId={progressId[selectedIndex]} />
      </div>

    </div>
  );
};