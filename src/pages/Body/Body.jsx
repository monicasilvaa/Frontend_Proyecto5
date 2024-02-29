import { Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute"
import { Home } from "../Home/Home"
import Login from "../Login/Login"
import { Profile } from "../Profile/Profile"
import Register from "../Register/Register"
import { Appointments } from "../User/Appointments"

export const Body = () => {

    return (
        <>
            <Routes>
                {/* Public routes */}
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login /> } />                
                <Route path="/register" element={<Register /> } />                
                
                {/* Private routes */}
                <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
                <Route path="/myAppointments" element={<PrivateRoute Component={Appointments} />} />
            </Routes>
        </>
    )
}