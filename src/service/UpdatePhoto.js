import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

const getConfig = (isFormData = false) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...(isFormData && { "Content-Type": "multipart/form-data" }),
    },
  };
};

export const updatePhotoStudent = async (id, file) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await axios.put(
    `${apiUrl}/Student/${id}/photo`,
    formData,
    getConfig(true)
  );

  return response.data;
};
