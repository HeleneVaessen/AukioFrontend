import React, { Component } from 'react';
import axios from "axios";
import NavigationBar from './NavigationBar';
import { Form } from 'react-bootstrap'
import UserService from '../services/UserService'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user: '',
            password: '',
            school: '',
            buttonInactive: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let valuename = event.target.name;
        this.setState({ [valuename]: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ buttonInactive: true });
        event.preventDefault();
        this.register(this.state.email, this.state.name, this.state.password, this.state.school)
    }

    componentDidMount() {
    }

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
                        Name:
          <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Label>
                        Password:
          <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Label>
                        School:
          <Form.Control type="text" name="school" value={this.state.school} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Control disabled={this.state.buttonInactive} type="submit" value="Register" block />
                </Form>
                </div>
        );
    }

    register = (email, name, password, school) => {
        UserService.register(email, name, password, school).then(
            (response) => {
                if (response.status === 200) {
                    alert('User registered');
                    window.location.pathname="/";
                }
            }
        ).catch((error) => {
            console.log(error);
            alert('Can not register user')
            this.setState({ buttonInactive: false });
        }
        );


    };

}
