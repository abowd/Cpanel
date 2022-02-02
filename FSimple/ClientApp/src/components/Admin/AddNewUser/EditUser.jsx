import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { useToasts } from "react-toast-notifications";
const EditUser = (props) => {
    const history = useHistory();
    const [userModel, setuserModel] = useState([]);
    const [success, setSuccess] = useState(false);
    const [nameErrorSMS, setnameErrorSMS] = useState("");
    const [Name, setName] = useState("");
    const [phoneErrorSMS, setphoneErrorSMS] = useState("");
    const [phone, setphone] = useState("");
    const [emailErrorSMS, setemailErrorSMS] = useState("");
    const [email, setemail] = useState("");

    let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const { addToast } = useToasts();
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

    const onchangeemail = (e) => {
        setemail()
        setemail(e.target.value);
        setemailErrorSMS("")

    }


    const userId = props.match.params.userId;
    useEffect(() => {
        if (userId !== "") {
            axios.get(`api/User/Get/${userId}`).then((data) => {
                setuserModel(data.data)
                setName(data.data.fullName)
                setphone(data.data.phoneNumber)
                setemail(data.data.email)
            })
        }
        }, [success])


    const handleUpdate = (event) => {
        event.preventDefault();
        const subdata = new FormData(event.target);

        console.log(Name, email, phone)

        if (Name === "" || Name === null) {
            setnameErrorSMS("FullName is required")
        }
        else if (email === "" || email === null || !validEmailRegex.test(email)) {
            setemailErrorSMS("Email is not Valid")
        }
        else if (phone === "" || phone === null) {
            setphoneErrorSMS("Phone Number is required")
        }
        else {
            axios.post('api/User/Update', subdata).then(response => {
                console.log(response);
                if (response.data) {
                    addToast('Update Successfully', { appearance: 'success' });
                }
                else {
                    addToast('Something Wrong ', { appearance: 'error' });
                }


            });
        }
   
    }


    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Update User </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to user list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>


                <div>
                    <Card>
                        <CardBody>
                            <Form className="mt-4" onSubmit={handleUpdate}>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Input type="hidden" id="Id" name="Id" value={userId} />
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name"> <strong> Full Name </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" defaultValue={userModel.fullName} name="Name" id="Name" onChange={(e) => onchangename(e)} placeholder="Enter the fullName" />
                                        <small className="form-text text-danger">{nameErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Email"> <strong> Email </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="email" defaultValue={userModel.email} name="Email" id="Email" onChange={(e) => onchangeemail(e)} placeholder="Enter Email" required />
                                        <small className="form-text text-danger">{emailErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="PhoneNumber"> <strong> Phone Number </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="PhoneNumber" defaultValue={userModel.phoneNumber} id="PhoneNumber" onChange={(e) => onchangephone(e)} placeholder="Enter Phone Number" />
                                        <small className="form-text text-danger">{phoneErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <Button>Update</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>


            </div>

        </div>
)
}

export default EditUser;