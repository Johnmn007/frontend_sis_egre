import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = `${apiUrl}/modalidades`;

export const postModalidad = async (modalidad) => {
  const { data } = await axios.post(API_URL, modalidad);
  return data;
};
