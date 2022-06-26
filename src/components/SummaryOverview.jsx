import React, { Component, useState } from "react";
import NavigationBar from "./NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Table} from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import UserService from "../services/UserService";
import SummaryService from "../services/SummaryService";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summaries:[],
            buttonInactive: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        SummaryService.getSummaries().then((response) => {
            this.setState({ summaries: response.data });
        }).catch(() => {
            alert("You must be logged in")
            window.location.pathname = "/";
        })
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
                <Table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.summaries.map(summary =>
                            <tr>
                                <td>{summary.title} </td>
                                <td> {summary.content}</td>
                                </tr>
                            )}
                        </tbody>
                </Table>
            </div>
        );
    }


}
