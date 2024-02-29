import { Container, Nav, Navbar } from "react-bootstrap";
import './Navbar.css';

export const NavBar = () => {
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
              <Nav.Link href="#home" className={"active navbar-link"}>
                Home
              </Nav.Link>
              <Nav.Link href="#skills" className={" navbar-link"}>
                Skills
              </Nav.Link>
              <Nav.Link href="#projects" className={"navbar-link"}>
                Projects
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
              <a href="/login">
                <button className="vvd">
                  <span>Quiero tatuarme</span>
                </button>
              </a>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};