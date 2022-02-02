import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import axios from 'axios';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const EditCategory = (props) => {
    const history = useHistory();
    const myForm = createRef();
    const { addToast } = useToasts();
    const [categoryModel, setcategoryModel] = useState([]);
    const [success, setSuccess] = useState(false);
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



    const categoryId = props.match.params.categoryId;
    useEffect(() => {
        if (categoryId !== 0) {
            axios.get(`api/Category/Get/${categoryId}`).then((data) => {
                setcategoryModel(data.data);
                setARNameSMS(data.data.name_AR)
                setEnNameSMS(data.data.name_EN)
            })
        }
    }, [success])

    const handleUpdate = (event) => {
        event.preventDefault();
   
        const subdata = new FormData(event.target);
        if (EnName === "" || EnName === null) {
            setEnErrorSMS("Name is required")
        }
        else if (ARName === "" || ARName === null) {
            setARErrorSMS("Name is required")
        }
        else {
            axios.put('api/Category/PutCategory', subdata).then(response => {
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
                        <h4> Update Category </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to category list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Form className="mt-4" ref={myForm} onSubmit={handleUpdate}>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Input type="hidden" id="Id" name="Id" value={categoryId} />
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name_EN"> <strong> Name_EN</strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="Name_EN" id="Name_EN" onChange={(e) => onchangeEn(e)} defaultValue={categoryModel.name_EN} placeholder="Enter  Name_EN" />
                                        <small className="form-text text-danger">{EnErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name_AR"> <strong> Name_AR </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="Name_AR" id="Name_AR" onChange={(e) => onchangeAR(e)} defaultValue={categoryModel.name_AR} placeholder="Enter Name_AR" />
                                        <small className="form-text text-danger">{ARErrorSMS}</small>
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

export default EditCategory;