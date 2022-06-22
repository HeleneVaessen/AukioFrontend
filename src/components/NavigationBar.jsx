import React, { Component } from "react"
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/UserService"
import Cookies from "universal-cookie";
import { Button } from "bootstrap";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
        };
    }

    logout() {
        UserService.deleteCookie();
        this.setState({ login: false });
        window.location.pathname = "/";
    }
    componentDidMount() {
        var cookie = new Cookies().get("Jwt");
        console.log(cookie)
        if (cookie !== undefined) {
            this.setState({ login: true });
        }
        else {
            this.setState({ login: false });
        }
    }
    render() {
        return(
        <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="login">Aukio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.state.login ? (
                                <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
                            ) : (<>
                                    <Nav.Link href="login">Login</Nav.Link>
                                <Nav.Link href="register">Register</Nav.Link></>)}
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            )
    }
}