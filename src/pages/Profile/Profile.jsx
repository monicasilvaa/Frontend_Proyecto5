import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { getUserById, userUpdate } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const myId = userRdxData.credentials.userData.userId

  useEffect(() => {
    getUserById(token, myId)
    .then((res) => {
        setProfileData(res);
    })
  }, []);

  const inputHandler = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    //Handler envío de formulario
    event.preventDefault();
        
    //Se procede con el login
    userUpdate(token, myId, profileData)
      .then((response) => {
          console.log(response);   
      })
      .catch((err) => {
        console.log(err);
      });    
  };

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

        <div className="miDiv">
            <Form className="shadow p-4 bg-white rounded" onSubmit={submitHandler}>
                <CustomInput type={"text"} name={"first_name"} value={profileData.first_name} placeholder="Nombre" handler={inputHandler} ></CustomInput>
                <CustomInput type={"text"} name={"last_name"} value={profileData.last_name} placeholder="apellido" handler={inputHandler} ></CustomInput>
                <CustomInput type={"email"} name={"email"} value={profileData.email} placeholder="email" handler={inputHandler} ></CustomInput>
                <CustomInput type={"password"} name={"password"} value={profileData.password} placeholder="contraseña" handler={inputHandler} ></CustomInput>
                <CustomInput type={"phone"} name={"phone"} value={profileData.phone} placeholder="Móvil" handler={inputHandler} ></CustomInput>
                <CustomInput type={"date"} name={"birthday_date"} value={profileData.birthday_date} placeholder="Fecha de nacimiento" handler={inputHandler} ></CustomInput>
            
                <Button className="w-100" variant="primary" type="submit">
                        Actualizar
                    </Button>
            </Form>
        </div>
    </div>
  );
};