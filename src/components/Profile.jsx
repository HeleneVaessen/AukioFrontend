import React, { Component, useState } from "react";
import NavigationBar from "./NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import UserService from "../services/UserService";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            email: '',
            school: '',
            password: '',
            newPassword: '',
            disabled: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        UserService.getID().then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                UserService.getUserData(response.data).then((userdata) => {
                    this.setState({ name: userdata.data.name });
                    this.setState({ email: userdata.data.email });
                    this.setState({ school: userdata.data.school });
                    console.log(userdata.data);
                })
            }
        }).catch(() => {
            alert("Please log in.");
            window.location.pathname = "/";
        });
    }

    handleChange = (event) => {
        let valuename = event.target.name;
        this.setState({[valuename]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ disabled: true });
        UserService.getID().then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                this.edit(response.data, this.state.email, this.state.name, this.state.password, this.state.newPassword, this.state.school)
            }
        }).catch(() => {
            alert("Please log in.");
            window.location.pathname = "/";
        });
    };

    render() {
        return (
            <div>
                <NavigationBar />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Email:
          <Form.Control type="text" disabled={this.state.disabled} name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Label>
                        Name:
          <Form.Control type="text" disabled={this.state.disabled} name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Label>
                        School:
          <Form.Control type="text" disabled={this.state.disabled} name="school" value={this.state.school} onChange={this.handleChange} />
                    </Form.Label>

                    {this.state.disabled ? (<></>) : (<> 
                        <Form.Label>
                            New password:
          <Form.Control type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
                        </Form.Label>
                <Form.Label>
                            Confirm password:
          <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </Form.Label></>)}
                    
                    {this.state.disabled ? (<></>) : (<Form.Control disabled={this.state.disabled} type="submit" value="Confirm changes" block />)}
                </Form>

                {this.state.disabled ?
                    (<button onClick={this.enableEdit} > Edit information</button>) : (<></>)}
            </div>
        );
    }

    enableEdit=()=> {
        this.setState({ disabled: false })
    }

    edit = (ID,name, email, password, newPassword, school) => {
        UserService.editUser(ID,name, email, password, newPassword, school).then(
            (response) => {
                if (response.status === 200) {
                    alert('Succes');
                }
            }
        ).catch((error) => {
            console.log(error);
            alert('Can not edit profile')
            this.setState({ disabled: false });
        }
        );
    }
}
