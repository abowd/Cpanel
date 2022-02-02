import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import Select from 'react-select';
import axios from 'axios';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const EditService= (props) => {
    const history = useHistory();
    const myForm = createRef();
    const { addToast } = useToasts();
    const [categoryList, setcategoryList] = useState([]);
    const [serviceModel, setServiceModel] = useState([]);
    const [categoryError, setcategoryError] = useState('');
    const [categoryLabel, setcategoryLabel] = useState('Select Category');
    const [categoryId, setcategoryId] = useState(0);
    const [success, setSuccess] = useState(false);
    const [ARErrorSMS, setARErrorSMS] = useState("");
    const [ARName, setARNameSMS] = useState("");
    const [EnErrorSMS, setEnErrorSMS] = useState("");
    const [EnName, setEnNameSMS] = useState("");

    const backtolist = () => {
           history.push("/servicesList");
    }

    const onchangeEn = (e) => {
        setEnNameSMS(e.target.value);
        setEnErrorSMS("")
    }

    const onchangeAR = (e) => {
        setARNameSMS(e.target.value);
        setARErrorSMS("")
    }
    const serviceId = props.match.params.serviceId;
    useEffect(() => {
        if (serviceId !== 0) {
            axios.get(`api/Service/Get/${serviceId}`).then((data) => {
                setServiceModel(data.data);
                setcategoryLabel(data.data.categoryNameEN + " (" + data.data.categoryNameAR + ")");
                setcategoryId(data.data.categoryId);
                setARNameSMS(data.data.name_AR)
                setEnNameSMS(data.data.name_EN)
            })
        }
    }, [success])



    useEffect(() => {

        axios.get(`api/Category/GetCategories`).then((data) => {
            setcategoryList(data.data)
        })
    }, [success])


    const categoryName = categoryList?.map(cata => ({ label: cata.name_EN + " (" + cata.name_AR + ")", value: cata.id }))
    const selectCategory = (label, value) => {
        setcategoryLabel(label);
        setcategoryId(value);
        setcategoryError(" ")
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const subdata = new FormData(event.target);

        console.log(EnName, ARName);

        if (EnName === "" || EnName === null) {
            setEnErrorSMS("Name is required")
        }
        else if (ARName === "" || ARName === null) {
            setARErrorSMS("Name is required")
        }
        else if (categoryId == 0) {
            setcategoryError("Select Category")
        }
        else {
            axios.post('api/Service/PutService', subdata).then(response => {
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
                        <h4> Update Service </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to service list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Form className="mt-4" ref={myForm} onSubmit={handleUpdate}>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Input type="hidden" id="Id" name="Id" value={serviceId} />
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name_EN"> <strong> Name_EN</strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="Name_EN" id="Name_EN" onChange={(e) => onchangeEn(e)} defaultValue={serviceModel.name_EN} placeholder="Enter  Name_EN" />
                                        <small className="form-text text-danger">{EnErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="Name_AR"> <strong> Name_AR </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Input type="text" name="Name_AR" id="Name_AR" onChange={(e) => onchangeAR(e)} defaultValue={serviceModel.name_AR} placeholder="Enter Name_AR" />
                                        <small className="form-text text-danger">{ARErrorSMS}</small>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="2">
                                        <Label for="CategoryId"> <strong> Category </strong> </Label>
                                    </Col>
                                    <Col md="6">
                                        <Select
                                            options={categoryName}
                                            value={{ label: categoryLabel, value: categoryId }}
                                            onChange={opt => selectCategory(opt.label, opt.value)}
                                            name="CategoryId"
                                            id="CategoryId"
                                        />
                                        <span className="text-danger"> {categoryError}</span>
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

export default EditService;