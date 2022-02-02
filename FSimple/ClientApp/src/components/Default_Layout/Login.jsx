import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Label, Form, Input, FormGroup, Row, NavLink } from 'reactstrap';
import axios from 'axios';
import { Redirect, Route } from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage:""
        }
    }

    handleChangeEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
        this.setState({ errorMessage: "" })
    }
    handleChangePassword = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
        this.setState({ errorMessage: "" })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        axios.post('api/Auth/Login/', {
            email,
            password
        }).then(response => {
            console.log(response);
            if (response.data.isSuccess) {
                localStorage.setItem("token", response.data.message);
                localStorage.setItem("role", response.data.roleName);
                window.location.reload();
            }
            else {
                this.setState({ errorMessage: response.data.message})
            }

           
        });
    }

    render() {
        const isAuthenticated = localStorage.getItem("token");

        return (
            isAuthenticated != null ? <Redirect to="/" /> :
                <div>
                    <div className="fs-main-login-form-bg">

                        <div className="fs-main-login-form">
                            <Card>
                                <CardBody>
                                    <div className="fs-login-form">
                                        <Form className="login-form" onSubmit={this.handleSubmit}>
                                            <h2 className="pb-3 logreg-header"> LOGIN</h2>
                                            <div className="m-3"></div>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="name@example.com" required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="examplePassword">Password</Label>
                                                <Input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="**********" required />
                                            </FormGroup>

                                            <FormGroup>
                                                <span className="text-danger mt-3 mb-3"> {this.state.errorMessage}  </span>
                                            </FormGroup>

                                            {/*<div className="forgot-pass">*/}
                                            {/*    <Row>*/}
                                            {/*        <Col xs="12" className="col-12">*/}
                                            {/*            <NavLink tag={Link} className="px-0 uapp-forget-pass" to="/forgotPassword">Forgot password?</NavLink>*/}
                                            {/*        </Col>*/}
                                            {/*    </Row>*/}
                                            {/*</div>*/}
                                            <Row>
                                                <Col xs="12">
                                                    <Button type="submit" color="primary" className="px-4 uapp-login-button">Login</Button>
                                                </Col>
                                            </Row>

                                            {/*<div style={{ display: 'flex', }}>*/}

                                            {/*    <span style={{ padding: "0.5rem 0rem", marginRight: "5px" }}> Not registered Yet?</span> <span>  <NavLink tag={Link} className="px-0 uapp-forget-pass" to="/forgotPassword">Create an Account</NavLink> </span>*/}

                                            {/*</div>*/}

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>


        );
    }
}
