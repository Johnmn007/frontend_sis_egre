// service/Count.js
import axios from "axios";
import { SET_COUNT_PROFESSIONS,SET_STUDENTS_COUNT } from "../context/Context";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const updateCountStudents = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const res = await axios.get(`${apiUrl}/countStudent`, config);
    dispatch({ type: SET_COUNT_PROFESSIONS, payload: res.data });
    const studentsRes = await axios.get(`${apiUrl}/Student`, config);
    dispatch({ type: SET_STUDENTS_COUNT, payload: studentsRes.data.length });
  } catch (error) {
    console.error("Error al obtener countStudent:", error);
  }
};
