import { useEffect, useState } from "react";
import { Button, Form, Offcanvas, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { getAppointmentsByClient, getCentersList, getServicesList, getTattooArtistsByCenterId, userUpdate } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./Appointments.css";

export const Appointments = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [appointmentsData, setAppointmentsData] = useState(false);
  const [centersData, setCentersData] = useState(false);
  const [tattooArtistsData, setTattoArtistsData] = useState(false);
  const [servicesData, setServicesData] = useState(false);
  const userRdxData = useSelector(userData)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = userRdxData.credentials.token

  const inputHandler = (event) => {
    getTattooArtistsByCenterId(event.target.value)
    .then((res) => {
      setTattoArtistsData(res);
    })
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


  useEffect(() => {
    //Obtener centros
    getCentersList()
    .then((res) => {
        setCentersData(res.results);
      })    

    //Obtener servicios
    getServicesList()
    .then((res) => {
      setServicesData(res.results);
    })

    //Obtener citas del cliente
    getAppointmentsByClient(token)
    .then((res) => {
        setAppointmentsData(res.clientAppointments);
      })
  }, []);

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Nueva cita
        </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Nueva cita</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="shadow p-4 bg-white rounded" onSubmit={submitHandler}>
              <Form.Select aria-label="Centro" name={"center_id"} onChange={inputHandler}>
                <option>Centro</option>
                {centersData.length > 0 ? 
                  centersData.map(function(data) {
                      return (
                        <option value={data.id}>{data.address}</option>
                      )
                  })
                  : "Sin centros"
                }
              </Form.Select>
              <Form.Select aria-label="Tatuador" name={"employee_user_id"}>
                <option>Tatuador</option>
                {tattooArtistsData.length > 0 ? 
                  tattooArtistsData.map(function(data) {
                      return (
                        <option value={data.id}>{data.first_name} {data.last_name}</option>
                      )
                  })
                  : "Sin tatuadores"
                }
              </Form.Select>

              <Form.Select aria-label="Servicio" name={"service_id"}>
                <option>Servicio</option>
                {servicesData.length > 0 ? 
                  servicesData.map(function(data) {
                      return (
                        <option value={data.id}>{data.name}</option>
                      )
                  })
                  : "Sin servicios"
                }
              </Form.Select>

              <CustomInput type={"date"} name={"appointment_date"} placeholder="Fecha para cita" ></CustomInput>
          
              <Button className="w-100" variant="primary" type="submit">
                      Actualizar
                  </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
        {appointmentsData.length > 0 ? 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tatuador</th>
                  <th>Fecha cita</th>
                  <th>Centro</th>
                  <th>Servicio</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsData.map(function(data) {
                    return (
                      <tr>
                        <td>{data.employeeUser.first_name} {data.employeeUser.last_name}</td>
                        <td>{data.appointment_date}</td>
                        <td>{data.center.address}</td>
                        <td>{data.service.name}</td>
                      </tr>            
                    )
                })}
                </tbody>
              </Table>
         : 
         <p>Actualmente no tienes citas</p>
        }
    </>
  )
}