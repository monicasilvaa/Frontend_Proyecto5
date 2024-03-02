import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import {
  appointmentUpdate,
  getAppointmentById,
  getAppointments, getCentersList, getServicesList,
  getTattooArtistsByCenterId,
  getTattooArtistsList
} from "../../services/apiCalls";
import { userData } from "../userSlice";

export const ListAllAppointments = () => {
  const [show, setShow] = useState(false);
  const userRdxData = useSelector(userData)
  const [appointmentId, setId] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const token = userRdxData.credentials.token
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [servicesData, setServicesData] = useState(false);
  const [centersData, setCentersData] = useState(false);
  const [tattooArtistsData, setTattoArtistsData] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id);

    setMessage(false);
    setError(false);

    getAppointmentById(token,id)
    .then((res) => {
        setAppointmentData(res);
    })

    getTattooArtistsList()
    .then((res) => {
      setTattoArtistsData(res.results);
    })

  }

  const selectHandler = (event) => {
    setAppointmentData({});
    getTattooArtistsByCenterId(event.target.value)
    .then((res) => {
      setTattoArtistsData(res);
    })

    inputHandler(event);
  };

  const inputHandler = (event) => {
    setAppointmentData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  
  const submitHandler = async (event) => {
    //Handler envío de formulario
    event.preventDefault();
        
    appointmentUpdate(token, appointmentId, appointmentData)
      .then((response) => {
          setMessage(response.message);   
      })
      .catch((err) => {
        setError(err.message);
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

    getAppointments(token)
    .then((res) => {
        setAppointmentsData(res.results);
      })    
  }, []);


  return (
    <>
      <div className="row">
        <Sidebar />
        <div className="col py-3 mx-2">
          {appointmentsData.length > 0 ? 
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tatuador</th>
                    <th>Servicio</th>
                    <th>Centro</th>
                    <th>Fecha cita</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsData.map(function(data) {
                      return (
                        <tr key={data.id} onClick={() => {handleShow(data.id)}}>
                          <td key={data.clientUser.username}>{data.clientUser.username}</td>
                          <td key={data.employeeUser.username}>{data.employeeUser.username}</td>
                          <td key={data.service.name}>{data.service.name}</td>
                          <td key={data.center.id}>{data.center.address}</td>
                          <td key={data.appointment_date}>{data.appointment_date}</td>
                        </tr>            
                      )
                  })}
                  </tbody>
                </Table>
            : 
            <p>Actualmente no existen citas</p>
          }
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? 
              <p className="danger">{error}</p>  
          :
              <p className="success">{message}</p>
          }
          <Form className="shadow p-4 bg-white rounded" onSubmit={submitHandler}>
                <Form.Select aria-label="Centro" value={appointmentData?.center?.id} name={"center"} onChange={selectHandler}>
                  <option>Centro</option>
                  {centersData.length > 0 ? 
                    centersData.map(function(data) {
                        return (
                          <option key={data.id} value={data.id}>{data.address}</option>
                        )
                    })
                    : "Sin centros"
                  }
                </Form.Select>
                <Form.Select aria-label="Tatuador" value={appointmentData?.employeeUser?.id} name={"employeeUser"} onChange={inputHandler}>
                  <option>Tatuador</option>
                  {tattooArtistsData.length > 0 ? 
                    tattooArtistsData.map(function(data) {
                        return (
                          <option key={data.id} value={data.id}>{data.first_name} {data.last_name}</option>
                        )
                    })
                    : "Sin tatuadores"
                  }
                </Form.Select>

                <Form.Select aria-label="Servicio" value={appointmentData?.service?.id} name={"service"} onChange={inputHandler}>
                  <option>Servicio</option>
                  {servicesData.length > 0 ? 
                    servicesData.map(function(data) {
                        return (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        )
                    })
                    : "Sin servicios"
                  }
                </Form.Select>

                <CustomInput type={"datetime-local"} value={appointmentData.appointment_date} name={"appointment_date"} placeholder="Fecha para cita" handler={inputHandler}></CustomInput>
            
                <Button className="w-100" variant="primary" type="submit" >
                        Reservar
                    </Button>
            </Form>

        </Modal.Body>
      </Modal>
    </>
  )
}