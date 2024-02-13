import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { NavLink } from "react-router-dom";


function Header() {
    return (
        <div>
            <h1 className="text-center">SMASKO</h1>
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='m-auto'>
                    <NavLink to="/">My Recipes</NavLink>
                    <NavLink to="/create">Create Recipe</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    );   
}

export default Header;