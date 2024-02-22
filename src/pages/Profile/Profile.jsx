import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getUserById } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const myId = userRdxData.credentials.userData.id

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {     // setTimeout para hacer más amable el acceso a los datos de perfil
        getUserById(token, myId)
        .then((res) => {
          console.log(res, "soy la respuesta del server")
          setProfileData(res);
      })
      }, 2000);
    }
  }, []);

  const inputHandler = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect (()=> {
    console.log(profileData)
  }, [profileData])

  const buttonHandler = () => {
    setIsEditing(!isEditing);
    console.log(isEditing)

    // if (isEditing === false) {
    //     setIsEditing(true)
    // } else {
    //     setIsEditing(false)
    // }
  };

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div className="profileDesign">
      

      { !!profileData.email 
      ?
      <>
        <h1>{profileData.createdAt}</h1>
        <h1>{profileData.email}</h1>
        <h1>{profileData.role}</h1>
        <h1>{profileData._id}</h1>
      </> 
      : <p>Cargando datos de perfil...</p>
      }
      <button onClick={() => buttonHandler()}></button>
      {isEditing 
      ? (
        <CustomInput
          name="firstName"  
          type="text"
          handler={inputHandler}
        ></CustomInput>
      ) : null}
    </div>
  );
};