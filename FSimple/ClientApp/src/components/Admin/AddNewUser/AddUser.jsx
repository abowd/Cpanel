import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import axios from 'axios';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const AddUser = (props) => {

    const history = useHistory();
    const myForm = createRef();
    const { addToast } = useToasts();
    const [nameErrorSMS, setnameErrorSMS] = useState("");
    const [Name, setName] = useState("");
    const [phoneErrorSMS, setphoneErrorSMS] = useState("");
    const [phone, setphone] = useState("");

    const [passwordErrorSMS, setpasswordErrorSMS] = useState("");
    const [password, setpassword] = useState("");

    const [confirmpasswordErrorSMS, setconfirmpasswordErrorSMS] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [emailErrorSMS, setemailErrorSMS] = useState("");
    const [email, setemail] = useState("");

    let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const backtolist = () => {
        history.push("/userList");
    }
    const onchangename = (e) => {
        setName(e.target.value);
        setnameErrorSMS("")
    }

    const onchangephone = (e) => {
        setphone(e.target.value);
        setphoneErrorSMS("")
    }
    const onchangepassword = (e) => {
        setpassword(e.target.value);
        setpasswordErrorSMS("")
    }
    const onchangeconfirmpassword = (e) => {
        setconfirmpassword(e.target.value);
        setconfirmpasswordErrorSMS("")
    }
    const onchangeemail = (e) => {
        setemail(e.target.value);
        setemailErrorSMS("")

    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const subdata = new FormData(event.target);
        if (Name === "" || Name === null) {
            setnameErrorSMS("FullName is required")
        }
        else if (email === "" || email === null || !validEmailRegex.test(email)) {
            setemailErrorSMS("Email is not Valid")
        }
        else if (phone === "" || phone === null) {
            setphoneErrorSMS("Phone Number is required")
        }
        
        else if (password === "" || password === null) {
            setpasswordErrorSMS("Password is required")
        }
        else if (confirmpassword !== password) {
            setconfirmpasswordErrorSMS("Password does not match")
        }
        else{
            axios.post('api/User/Create', subdata).then(response => {
                console.log(response);
                if (response.data.isSuccess) {
                    addToast(response.data.message, { appearance: 'success' });
                }
                else {
                    addToast(response.data.message, { appearance: 'error' });
                }
            });
        }


    }

    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Add New User </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to user list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Form className="mt-4" ref={myForm} onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name"> <strong> Full Name </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" onChange={(e) => onchangename(e)} name="FullName" id="FullName" placeholder="Enter the fullName" />
                                        <small className="form-text text-danger">{nameErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Email"> <strong> Email </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="email" autoComplete="none" name="Email" id="Email" onChange={(e) => onchangeemail(e)} placeholder="Enter Email" required />
                                        <small className="form-text text-danger">{emailErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="PhoneNumber"> <strong> Phone Number </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="PhoneNumber" onChange={(e) => onchangephone(e)} id="PhoneNumber" placeholder="Enter Phone Number"  />
                                        <small className="form-text text-danger">{phoneErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Password"> <strong> Password </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="password" name="Password" id="Password" onChange={(e) => onchangepassword(e)} placeholder=" *********" />
                                        <small className="form-text text-danger">{passwordErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Password"> <strong> Password Confirm </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="password" name="PasswordConfirm" id="PasswordConfirm" onChange={(e) => onchangeconfirmpassword(e)}  placeholder=" *********" />
                                        <small className="form-text text-danger">{confirmpasswordErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <Button>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>


            </div>

        </div>
    )

}

    export default AddUser;