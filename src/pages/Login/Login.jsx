import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { userLogin } from "../../services/apiCalls";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";

import "./Login.css";
import Logo from "../../assets/images/logo.png";

export const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
      /*if (userData) {
        navigate("/");
      } */
    }, []);

    const inputHandler = (event) => {
        setCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    
    setShow(false);
    setLoading(true);
    await delay(500);

    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
      })
      .catch((err) => {
        setError((prevState) => ({
          ...prevState,
          errorStatus: err.response.status,
          errorMessage: err.response.data.error,
        }))
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 2000);
      });

    setLoading(false);
  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="loginContenedor"
//      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
        <div className="loginBackdrop"></div>
        <Form className="shadow p-4 bg-white rounded" onSubmit={submitHandler}>
            <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
            />
            <div className="h4 mb-2 text-center">Acceder</div>
            {show ? (
            <Alert
                className="mb-2"
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
            >
                Usuario y/o contraseña incorrectos.
            </Alert>
            ) : (
            <div />
            )}
            <Form.Group className="mb-2" controlId="email">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    type="email"
                    name={"email"}
                    value={userData.email}
                    placeholder="Email"
                    onChange={inputHandler}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name={"password"}
                    value={userData.password}
                    placeholder="Contraseña"
                    onChange={inputHandler}
                    required
                />
            </Form.Group>
            <br/>
            {!loading ? (
                <Button className="w-100" variant="primary" type="submit">
                    Entrar
                </Button>
            ) : (
                <Button className="w-100" variant="primary" type="submit" disabled>
                    Accediendo ...
                </Button>
            )}
            <div className="d-grid justify-content-end">
                <Button
                    className="text-muted px-0"
                    variant="link"
                    onClick={handlePassword}
                >
                    ¿Has olvidado tu contraseña?
                </Button>
            </div>
      </Form>
    </div>
  );
};

export default Login;
