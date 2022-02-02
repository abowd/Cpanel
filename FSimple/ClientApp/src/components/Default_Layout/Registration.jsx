import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Label, Form, Input, FormGroup, Row, NavLink } from 'reactstrap';
export class Registration extends Component {
    render() {
        return (
            <div>
                <div className="fs-main-login-form-bg">

                    <div className="fs-main-login-form">
                        <Card>
                            <CardBody>
                                <div className="fs-login-form">
                                    <Form className="login-form" >
                                        <h2 className="pb-3 logreg-header"> Registration</h2>
                                        {/* <span className='error' style={{ color: "#F87675", fontSize: "14px" }} >{this.state.loginError}</span>*/}
                                        <div className="m-3"></div>
                                        <FormGroup>
                                            <Label for="exampleEmail">FullName</Label>
                                            <Input type="test" name="FullName" id="FullName" placeholder="Enter FullName" required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleEmail">Email</Label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="name@example.com" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword">Password</Label>
                                            <Input type="password" name="password" id="examplePassword" placeholder="**********" />
                                        </FormGroup>

                                        <Row>
                                            <Col xs="12">
                                                <Button type="submit" color="primary" className="px-4 uapp-login-button">Submit</Button>
                                            </Col>
                                        </Row>

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
