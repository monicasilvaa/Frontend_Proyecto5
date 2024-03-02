import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../pages/userSlice";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials.userData

  const logMeOut = () => {
    dispatch(logout({credentials: {}}))
    setTimeout(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand href="/">
            Tattoo Studio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/#home" className={"active navbar-link"}>
                Home
              </Nav.Link>
              <Nav.Link href="/#tatuadores" className={" navbar-link"}>
                Tatuadores
              </Nav.Link>
              <Nav.Link href="/#centros" className={"navbar-link"}>
                Centros
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#">
                  <img src={`https://i.imgur.com/s3noPaC.png`} alt="" />
                </a>
                <a href="#">
                  <img src={`https://i.imgur.com/rxgJBL4.png`} alt="" />
                </a>
                <a href="#">
                  <img src={`https://i.imgur.com/cE0RPru.png`} alt="" />
                </a>
              </div>
              <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Resgistrarse</NavDropdown.Item>
                </>
              ) : decoded.userRole === "superadmin" ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="dashboard">Admin</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                </>
              ) : decoded.userRole === "tattoo artist" ? (
                  <>
                    <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/tattooArtistAppointments">Mis citas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                  </>
                            
              ) : (
                <>
                  <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="/myAppointments">Mis citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
