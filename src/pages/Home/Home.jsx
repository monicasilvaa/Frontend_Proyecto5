import { useEffect, useState } from "react";
import "./Home.css";

export const Home = () => {
  
  const userRdxData = useSelector(userData)
  const token = userRdxData.credentials.token

  useEffect(() => {
    
    if (!token) {
      navigate("/login");
    } 

  }, []);

  return (
    <div>
      
      <h1>HOME</h1>
      
    </div>
  );
};
