import React, { createContext, useReducer, useEffect } from 'react';
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const SET_ROL = 'SET_ROL';
const SET_PERMISOS = 'SET_PERMISOS';
const SET_COUNT_PROFESSIONS = 'SET_COUNT_PROFESSIONS';
const SET_STUDENTS_COUNT = 'SET_STUDENTS_COUNT';
const FETCH_ERROR = 'FETCH_ERROR';

const initialState = {
  rol: [],
  permisos: {},
  countProfessions: [],
  studentsCount: 0,
  error: null
};

const DataReducer = (state, action) => {
  switch (action.type) {
    case SET_ROL:
      return { ...state, rol: action.payload };
    case SET_PERMISOS:
      return { ...state, permisos: action.payload };
    case SET_COUNT_PROFESSIONS:
      return { ...state, countProfessions: action.payload };
    case SET_STUDENTS_COUNT:
      return { ...state, studentsCount: action.payload };
    case FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Si no hay token, no cargar datos protegidos
        if (!token) {
          dispatch({ type: SET_ROL, payload: [] });
          dispatch({ type: SET_PERMISOS, payload: {} });
          dispatch({ type: SET_STUDENTS_COUNT, payload: 0 });
          dispatch({ type: SET_COUNT_PROFESSIONS, payload: [] });
          return;
        }

        const config = { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        };

        // 👉 fetch paralelo para datos protegidos
        const [rolRes, permisosRes, countRes, studentsCountRes] = await Promise.all([
          axios.get(`${apiUrl}/Rol`, config),
          axios.get(`${apiUrl}/permisos`, config),
          axios.get(`${apiUrl}/countStudent`, config),
          axios.get(`${apiUrl}/Student`, config)
        ]);

        dispatch({ type: SET_ROL, payload: rolRes.data });
        dispatch({ type: SET_PERMISOS, payload: permisosRes.data });
        dispatch({ type: SET_STUDENTS_COUNT, payload: studentsCountRes.data.length });
        dispatch({ type: SET_COUNT_PROFESSIONS, payload: countRes.data });

      } catch (error) {
        if (error.response?.status === 401) {
          // Token inválido o expirado - limpiar y usar datos vacíos
          console.log("Token inválido, limpiando datos...");
          localStorage.removeItem("token");
          dispatch({ type: SET_ROL, payload: [] });
          dispatch({ type: SET_PERMISOS, payload: {} });
          dispatch({ type: SET_STUDENTS_COUNT, payload: 0 });
          dispatch({ type: SET_COUNT_PROFESSIONS, payload: [] });
        } else {
          console.error("Error en datos públicos/privados:", error);
          dispatch({ type: FETCH_ERROR, payload: error.message });
        }
      }
    };

    fetchData();
  }, []); // 👈 Se ejecuta solo una vez al montar el componente

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export {
  DataContext,
  DataProvider,
  SET_ROL,
  SET_PERMISOS,
  SET_COUNT_PROFESSIONS,
  SET_STUDENTS_COUNT,
  FETCH_ERROR
};