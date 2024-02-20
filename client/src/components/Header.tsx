import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { NavLink } from "react-router-dom";
import './header.css';


function Header() {
    return (
        <div className="header">
      <h1 className="header-title">SMASKO</h1>
      <Navbar expand="lg" className="navbar navbar-expand">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav mx-auto">
              <Nav.Item className="nav-item text-center">
              <NavLink to="/" className="nav-link" aria-current="page">My Recipes</NavLink>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <NavLink to="/create" className="nav-link">Create Recipe</NavLink>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    );   
}

export default Header;