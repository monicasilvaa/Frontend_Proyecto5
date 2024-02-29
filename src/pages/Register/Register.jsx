import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userCreate } from "../../services/apiCalls";

//import { useNavigate } from "react-router-dom"

export const Register = () => {

    const [userData, setUserData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email:'',
        password: '',
        phone: '',
        birthday_date: ''
    })

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    useEffect (() => {

        // navigate('/')
    }, [])


    const submitHandler = async (event) => {
        //Handler envío de formulario
        event.preventDefault();
            
        //Se procede con el login
        userCreate(userData)
          .then((response) => {
            //Se decodifica el token obtenido en la petición
            console.log(response);
        
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });    
      };

    return (
        <div className="miDiv">
            <Form className="shadow p-4 bg-white rounded" onSubmit={submitHandler}>
                <CustomInput type={"text"} name={"username"} placeholder="username" handler={inputHandler} ></CustomInput>
                <CustomInput type={"text"} name={"first_name"} placeholder="Nombre" handler={inputHandler} ></CustomInput>
                <CustomInput type={"text"} name={"last_name"} placeholder="apellido" handler={inputHandler} ></CustomInput>
                <CustomInput type={"email"} name={"email"} placeholder="email" handler={inputHandler} ></CustomInput>
                <CustomInput type={"password"} name={"password"} placeholder="contraseña" handler={inputHandler} ></CustomInput>
                <CustomInput type={"phone"} name={"phone"} placeholder="Móvil" handler={inputHandler} ></CustomInput>
                <CustomInput type={"date"} name={"birthday_date"} placeholder="Fecha de nacimiento" handler={inputHandler} ></CustomInput>
            
                <Button className="w-100" variant="primary" type="submit">
                        Registrarme
                    </Button>
            </Form>
        </div>
    )
}

export default Register;