import { screensKey } from "../utils/screensKey";

// Leer datos
const getData = async (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo datos:", error);
    return [];
  }
};

// Guardar datos
const setData = async (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error guardando datos:", error);
    return false;
  }
};

//structure data BD functions
const getStructureData = async () => {
  return await getData(screensKey.bdKeys.STRUCTURE_KEY);
};

const setStructureData = async (data) => {
  return await setData(screensKey.bdKeys.STRUCTURE_KEY, data);
};

//structure Rutine complets BD functions

const getRutineComplets = async () => {
  return await getData(screensKey.bdKeys.RUTINE_COMPLETS_KEY);
};

const setRutineComplets = async (data) => {
  return await setData(screensKey.bdKeys.RUTINE_COMPLETS_KEY, data);
};
//structure progress container BD functions

const getProgressContainer = async () => {
  return await getData(screensKey.bdKeys.PROGREES_KEY);
};

const setProgressContainer = async (data) => {
  return await setData(screensKey.bdKeys.PROGREES_KEY, data);
};

//structure task data BD functions

const getTaskData = async () => {
  return await getData(screensKey.bdKeys.TASK_KEY);
};

const setTaskData = async (data) => {
  return await setData(screensKey.bdKeys.TASK_KEY, data);
};

export {
  getStructureData,
  setStructureData,
  getRutineComplets,
  setRutineComplets,
  getProgressContainer,
  setProgressContainer,
  getTaskData,
  setTaskData,
};
