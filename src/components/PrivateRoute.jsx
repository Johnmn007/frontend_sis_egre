import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setValid(false);
      return;
    }

    const checkToken = () => {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setValid(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setValid(false);
      }
    };

    checkToken(); // validar al cargar
    const interval = setInterval(checkToken, 60000); // cada 1 min
    return () => clearInterval(interval);
  }, []);

  if (!valid) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
