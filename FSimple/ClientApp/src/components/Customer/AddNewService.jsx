import React, { createRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import { Form, FormGroup, Label, Input, FormText, Row, Col, Badge, Table, Card, Button, Modal, ModalBody, ModalFooter, ModalHeader, CardBody, Breadcrumb, BreadcrumbItem, Progress, Alert } from 'reactstrap';
const CategoryServices = (props) => {
    const history = useHistory();
    const [categorysList, setcategorysList] = useState([]);
    const [serviceList, setserviceList] = useState([]);
    const [nullList, setnullList] = useState(0);
    const [success, setSuccess] = useState(false);
    const myForm = createRef();
    const [deleteModal, setDeleteModal] = useState(false);
    const [hidebtn, sethidebtn] = useState(true);
    const [serviceNameEN, setserviceNameEN] = useState("");
    const [serviceNameAR, setserviceNameAR] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [StartDateErrorSMS, setStartDateErrorSMS] = useState("");
    const [EndDateErrorSMS, setEndDateErrorSMS] = useState("");
    const [FilesErrorSMS, setFilesErrorSMS] = useState("");
    const [imagePreviewUrl, setimagePreviewUrl] = useState("");
    const [files, setfiles] = useState([]);
    const [uId, setserviceId] = useState(0);
    const [countService, setcountService] = useState(0);
    const { addToast } = useToasts();
    const [serialNum] = useState(1);
    let [checked, setChecked] = useState([]);
    useEffect(() => {
        axios.get('api/category/GetCategories')
            .then((response) => {
                setcategorysList(response.data)
            });
        let demoList = JSON.parse(localStorage.getItem("itemCart")) || [];
        setcountService(demoList.length)
    }, [success])


    const handlefilter = (id) => {
        axios.get(`api/Service/ServiceByCatagory/${id}`).then((data) => {
            if (data.data == 1) {
                setnullList(data.data)
                setserviceList([])
            }
            else {
                setserviceList(data.data)
                setnullList(0)
            }

        })
    }

    const toggleDanger = (en, ar, id) => {

        setserviceNameEN(en)
        setserviceNameAR(ar)
        setserviceId(id)
        setDeleteModal(true)
        setStartDateErrorSMS("")
        setEndDateErrorSMS("")
        setFilesErrorSMS("")
        setendDate("")
        setstartDate("")
    }

    // on Close Delete Modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setserviceNameAR("")
        setserviceNameEN("")
        setserviceId(0)
        setStartDateErrorSMS("")
        setEndDateErrorSMS("")
        setFilesErrorSMS("")
        setendDate("")
        setstartDate("")
    }
    var token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const onchangestartDate = (e) => {
        setstartDate(e.target.value);
            setStartDateErrorSMS("")
      
    }

    const onchangeEndDate = (e) => {
        setendDate(e.target.value);
        setEndDateErrorSMS("")
    }

    //const updateUploadedFiles = (event) => {
    //    setfiles(event.target.files[0]);
    //    setFilesErrorSMS("")
    //    setimagePreviewUrl(event.target.files[0].name);
    //}
    const addnewservice = () => {
        history.push("/");

    }
    const handleSubmit = (event) => {
        if (startDate === "") {
            setStartDateErrorSMS("Start date is required")
        }
        else if (endDate === ""){
            setEndDateErrorSMS("End date is required")
        }
        else {

            let demoList = JSON.parse(localStorage.getItem("itemCart")) || [];
            let service = 0;
            if (demoList.length > 0) {
                const inx = demoList.find((item) => { return !(item.serviceId !== uId) });
                service = typeof inx === "undefined" ? 0 : inx.serviceId;
            }
            console.log("service", service);
            if (service === uId) {
                addToast('Already Add Service', { appearance: 'error' });
                setDeleteModal(false);
                setserviceNameEN("")
                setserviceNameAR("")
                setserviceId(0)
                service = 0;
            }
            else {
                let item = {
                    serviceId: 0, name_EN: "", name_AR: "", startDate: "", endDate: ""
                }
                item.name_EN = serviceNameEN;
                item.name_AR = serviceNameAR;
                item.startDate = startDate;
                item.endDate = endDate;
                item.serviceId = uId;
                demoList.push(item);
                const parsed = JSON.stringify(demoList);
                localStorage.setItem("itemCart", parsed);
                addToast('Added Successfully', { appearance: 'success' });
                setDeleteModal(false);
                setserviceNameEN("")
                setserviceNameAR("")
                setserviceId(0)
                service = 0;
                setfiles([])
                setSuccess(!success);
            }

        }


    }


    // handling checkbox
    //const handleCheck = (e, service) => {

    //    let id = e.target.id;
    //    let val = e.target.checked;
    //    if (val == true) {
    //        setChecked([...checked, service]);
    //        sethidebtn(false)
    //    } else {
    //        const index = checked.findIndex((item) => { return !(item.id === id) });
    //        console.log("test", index);
    //        if (index > -1) {
    //            checked.splice(index, 1);
    //            if (checked.length === 0) {
    //                sethidebtn(true)
    //            }
    //        }
    //    }

    //}

    return (
        <div>
            <div className="sf-table-custom">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Category Services</h4>
                        {role !== "Admin" &&
                            <button type="button" className="btn btn-primary btn-sm" onClick={addnewservice}>
                                Request Items <span className="badge badge-light">{countService} </span>
                            </button>}
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardBody>
                        <div>
                            <h4> Select Category </h4>
                            <Progress style={{ height: "0.5rem" }} color="warning" className="mt-3" value={15} he />
                        </div>

                        <Row className="mt-4">
                            {
                                categorysList?.map((category, i) => <Col lg="2" md="2" xs="3" key={category.id} >

                                    <Badge onClick={() => handlefilter(category.id)} pill style={{ padding: "8px 12px", marginBottom: "10px", cursor: "pointer", borderRadius: "30px" }}>
                                        {category.name_EN}
                                    </Badge>
                                </Col>)}
                        </Row>

                        {
                            nullList === 1 &&
                            <Alert color="danger" className="mt-5">
                                This Category no assign Service, Select another Category .
                            </Alert>
                        }

                        {
                            serviceList.length != 0 &&

                            <div className="mt-5">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>English Name</th>
                                            <th>Arabic Name</th>
                                            <th>Category </th>
                                            {role !== "Admin" &&
                                                <th>Action </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            serviceList?.map((service, i) => <tr key={service.id} >
                                                <td>{serialNum + i}</td>
                                                <td>{service.name_EN}</td>
                                                <td>{service.name_AR}</td>
                                                <td>{service.categoryNameEN + "(" + service.categoryNameAR + ")"}</td>
                                                {role !== "Admin" &&
                                                    <td> <Button color="info" size="sm" onClick={() => toggleDanger(service.name_EN, service.name_AR, service.id)}> Order Now</Button> </td>
                                                }
                                                </tr>
                                            )}
                                    </tbody>
                                </Table>


                                <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">
                                    <ModalHeader style={{ fontSize: "16px" }}>Are You Sure to this {serviceNameEN}  </ModalHeader>

                                    <ModalBody>

                                        <Form>

                                            <FormGroup row className="has-icon-left position-relative">
                                                <Input type="hidden" id="CheckedArr" name="CheckedArr" value={checked} />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="StartDate">Start Date</Label>
                                                <Input type="date" onChange={(e) => onchangestartDate(e)} name="StartDate" id="StartDate" required />
                                                <small className="form-text text-danger">{StartDateErrorSMS}</small>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="EndDate">End Date</Label>
                                                <Input type="date" onChange={(e) => onchangeEndDate(e)} name="EndDate" id="EndDate" required />
                                                <small className="form-text text-danger">{EndDateErrorSMS}</small>
                                            </FormGroup>

                                            {/*<FormGroup className="mt-3">*/}
                                            {/*    <Label for="File">Attached File</Label>*/}
                                            {/*    <Input type="file" onChange={(e) => updateUploadedFiles(e)} name="File" id="File" required />*/}
                                            {/*    <small className="form-text text-danger">{FilesErrorSMS}</small>*/}
                                            {/*</FormGroup>*/}

                                            <FormGroup className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button size="sm" color="success" onClick={handleSubmit}> Confirm Order </Button>
                                                <Button size="sm" color="danger" onClick={closeDeleteModal}> Cancel </Button>
                                            </FormGroup>
                                        </Form>
                                    </ModalBody>
                                </Modal>

                            </div>

                        }

                    </CardBody>
                </Card>
            </div>
        </div>
    )

}

export default CategoryServices;