import React, { Component, useState } from "react";
import NavigationBar from "./NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import UserService from "../services/UserService";
import SummaryService from "../services/SummaryService";

export default class AddSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
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
        this.addSummary(this.state.title, this.state.content);
    };

    render() {
        return (
            <div>
                <NavigationBar />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>
                        Title:
          <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Label>
                        Content:
          <textarea class="form-control" type="text" rows="10" name="content" value={this.state.content} onChange={this.handleChange} />
                    </Form.Label>
                    <Form.Control disabled={this.state.buttonInactive} type="submit" value="Add summary" block />
                </Form>
            </div>
        );
    }

    addSummary = (title, content) => {
        UserService.getID().then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                SummaryService.addSummary(response.data, title, content).then(() => {
                    alert("Added summary succesfully.")
                    window.location.pathname = "/summaries";
                }).catch(() => {
                    alert("Could not add summary");
                })
            }
        }).catch(() => {
            alert("You must be logged in");
            window.location.pathname = "/";
        });
    }
}
