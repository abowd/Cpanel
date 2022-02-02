import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import axios from 'axios';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const AddCategory = (props) => {
    const history = useHistory();
    const myForm = createRef();
    const { addToast } = useToasts();
    const [ARErrorSMS, setARErrorSMS] = useState("");
    const [ARName, setARNameSMS] = useState("");
    const [EnErrorSMS, setEnErrorSMS] = useState("");
    const [EnName, setEnNameSMS] = useState("");
    const backtolist = () => {
        history.push("/category/list");
    }


    const onchangeEn = (e) => {
        setEnNameSMS(e.target.value);
        setEnErrorSMS("")
    }

    const onchangeAR = (e) => {
        setARNameSMS(e.target.value);
        setARErrorSMS("")
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const subdata = new FormData(event.target);
        if (EnName==="") {
            setEnErrorSMS("Name is required")
        }
        else if (ARName === "") {
            setARErrorSMS("Name is required")
        }
        else {
            axios.post('api/Category/PostCategory', subdata).then(response => {
                console.log(response);
                if (response.data.id != 0) {
                    addToast('Added Successfully', { appearance: 'success' });
                }
                else {
                    addToast('Something Wrong', { appearance: 'error' });
                }
            });
        }
    }

    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Add New Category </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to category list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Form className="mt-4" ref={myForm} onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name_EN"> <strong> Name_EN</strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" onChange={(e) => onchangeEn(e)} name="Name_EN" id="Name_EN" placeholder="Enter  Name_EN" />
                                        <small className="form-text text-danger">{EnErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name_AR"> <strong> Name_AR </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" onChange={(e) => onchangeAR(e)} name="Name_AR" id="Name_AR" placeholder="Enter Name_AR" />
                                        <small className="form-text text-danger">{ARErrorSMS}</small>
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

export default AddCategory;