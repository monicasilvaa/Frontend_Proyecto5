import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

axios.defaults.baseURL = ""

// Configurar un interceptor de respuesta para todas las solicitudes
axios.interceptors.response.use(
    response => response, // Pasar la respuesta sin cambios si es exitosa
    error => {
      if (error.response && error.response.status === 401) {
        // Redirigir a la página de login en caso de respuesta 401
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

export const deleteUser = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_BASE_URL}/user/delete/${id}`, config)
}

export const userLogin = async (credentials) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
    return res.data.token
}

export const userCreate = async (userData) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, userData)
    return res.data
}

export const userUpdate = async (token, id, userData) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.patch(`${API_BASE_URL}/api/users/profile/${id}`, userData, config)
    return res.data
}

export const appointmentUpdate = async (token, id, appointmentData) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.patch(`${API_BASE_URL}/api/appointments/${id}`, appointmentData, config)
    return res.data
}

export const getUserById = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.get(`${API_BASE_URL}/api/users/profile/${id}`, config)
    return res.data
}

export const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.get(`${API_BASE_URL}/api/users`, config)
    return res.data
}

export const appointmentCreate = async (token, appointmentData) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.post(`${API_BASE_URL}/api/appointments`, appointmentData, config)
    return res.data
}

export const getAppointmentsByClient = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.get(`${API_BASE_URL}/api/users/myAppointments`, config)
    return res.data
}

export const getAppointments = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.get(`${API_BASE_URL}/api/appointments`, config)
    return res.data
}

export const getAppointmentsByTattooArtist = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.get(`${API_BASE_URL}/api/users/tattooArtistAppointments`, config)
    return res.data
}



export const getAppointmentById = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const res = await axios.get(`${API_BASE_URL}/api/appointments/${id}`, config)
    return res.data
}

export const getTattooArtistsList = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/users/tattooArtists`)
    return res.data
}

export const getCentersList = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/centers`)
    return res.data
}

export const getServicesList = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/services`)
    return res.data
}

export const getTattooArtistsByCenterId = async (centerId) => {
    const res = await axios.get(`${API_BASE_URL}/api/users/tattooArtists/${centerId}`)
    return res.data
}