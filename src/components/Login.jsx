import React, { Component, useState } from "react";
import NavigationBar from "./NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import UserService from "../services/UserService";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonInactive: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let valuename = event.target.name;
        this.setState({ [valuename]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ buttonInactive: true });
        this.login(this.state.email, this.state.password);
    };

    render() {
        return (
            <div>
                <NavigationBar />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Email:
          <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Label>
                        Password:
          <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Control disabled={this.state.buttonInactive} type="submit" value="Login" block />
                </Form>
            </div>
        );
    }

    login = (email, password) => {
        UserService.login(email,password).then(
            (response) => {
                if (response.status === 200) {
                    alert('Succes');
                    window.location.pathname = "/profile";
                }
            }
        ).catch((error) => {
            console.log(error);
            alert('Can not login, check credentials')
            this.setState({ buttonInactive: false });
        }
        );
}
}
