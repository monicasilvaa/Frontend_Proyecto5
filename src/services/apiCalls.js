import axios from "axios";

axios.defaults.baseURL = ""

const API_URL = "http://localhost:3000"

export const bringFilteredUsers = async (name, role) => {

    const res = await axios.get(`http://localhost:27017/user/megafiltro?name=${name}&role=${role}`)
    return res.data
}

export const bringAllUsers = async (page=1) => {
    const res = await axios.get(`http://localhost:27017/user/find?page=${page}`)
    console.log(res)
    return res.data
}

export const bringUsersByRole = async (role) => {
    const res = await axios.get(`http://localhost:27017/user?role=${role}`)
    return res.data
}

export const bringAllCharacters = async (url) => {
    if (url) {
        const res = await axios.get(url)
        return res.data
    } else {
    const res = await axios.get(`${API_URL}/character`)
    return res.data
    }
}

export const deleteUser = async (token, id) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    const res = await axios.delete(`${API_URL}/user/delete/${id}`, config)
}

export const bringUserById = async (id) => {
    const res = await axios.get(`${API_URL}/users/${id}`)
    return res.data
}

export const userLogin = async (credentials) => {
    console.log(credentials)
    const res = await axios.post(`${API_URL}/auth/login`, credentials)
    return res.data.token
}

export const registerUser = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData)
    return res.data.token
}

export const getUserById = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const res = await axios.get(`${API_URL}/user/${id}`, config)
    return res.data
}