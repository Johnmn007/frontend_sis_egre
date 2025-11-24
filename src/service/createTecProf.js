import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const getTecProf = async () => {
  const res = await axios.get(`${apiUrl}/tecProfession`);
  return res.data;
};

export const postTecProf = async (newProfession) => {
  const response = await axios.post(`${apiUrl}/tecProf`, newProfession);
  return response.data;
};

export const deleteTecProf = async (id) => {
  await axios.delete(`${apiUrl}/tecProfession/${id}`);
};
