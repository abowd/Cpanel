import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { useToasts } from "react-toast-notifications";
import { Form, Label, Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, FormGroup, Modal, ModalBody, Input } from 'reactstrap';
const ViewServices = (props) => {
    const history = useHistory();
    const [servecsModel, setservecsModel] = useState([]);
    const [success, setSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [SId, setSId] = useState(0);
    const myForm = createRef();
    const { addToast } = useToasts();
    const backtolist = () => {
        history.push("/myOrder/list");
    }
    const newreqId = props.match.params.requstitemId;

    useEffect(() => {
        if (newreqId !== 0) {
            axios.get(`api/OrderRequest/GetItem/${newreqId}`).then((data) => {
                setservecsModel(data.data)
            });
        }
    }, [success])

    const toggleDanger = (id) => {
        alert("id",id);
        setDeleteModal(true)
        setSId(id);
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setSId(0);
    }
 
    const handleSubmit = (event) => {

        event.preventDefault();
        const subdata = new FormData(event.target);
        axios.post('api/OrderRequest/RequestFileUplode', subdata).then(response => {
            if (response.data.id !== 0) {
                setSId(0);
                setDeleteModal(false);
                addToast('Uplode Successfully', { appearance: 'success' });
                setSuccess(!success)
            }

        })
    }
    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> View Request Item </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to Home</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            {
                                servecsModel?.map((service, i) => <div key={service.id} className="mt-4">
                                    <Row className="mb-2">
                                        <Col md="4"> <span> Service Name</span>    </Col>
                                        <Col md="1"> <span> : </span>    </Col>
                                        <Col Col md="6"> {service.serviceName}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col md="4"> <span> Create Date</span>    </Col>
                                        <Col md="1"> <span> : </span>    </Col>
                                        <Col Col md="6"> {service.createDate}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md="4"> <span> Start Date</span>    </Col>
                                        <Col md="1"> <span> : </span>    </Col>
                                        <Col Col md="6"> {service.startDate}</Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col md="4"> <span> EndDate</span>    </Col>
                                        <Col md="1"> <span> : </span>    </Col>
                                        <Col Col md="6"> {service.endDate}</Col>
                                    </Row>
                                    {
                                        service.attachedFile !== null ?
                                            <Row className="mb-2">
                                                <Col md="4"> <span> Download File</span>    </Col>
                                                <Col md="1"> <span> : </span>    </Col>
                                                <Col Col md="6">   <a href={service.attachedFile} download> <Button color="primary" size="sm">Download</Button></a></Col>
                                            </Row> :

                                            <Row className="mb-2">
                                                <Col md="4"> <span> Uplode File</span>    </Col>
                                                <Col md="1"> <span> : </span>    </Col>
                                                <Col Col md="6">   <Button color="primary" size="sm" onClick={() => toggleDanger(service.id)}>Uplode File</Button></Col>
                                            </Row>

                                    }

                                </div>)}



                            <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">

                                <ModalBody>

                                    <Form ref={myForm} onSubmit={handleSubmit}>

                                        <FormGroup row className="has-icon-left position-relative">
                                            <Input type="hidden" id="Id" name="Id" value={SId} />
                                        </FormGroup>

                                        <FormGroup className="mt-3">
                                            <Label for="File">Attached File</Label>
                                            <Input type="file" name="File" id="File" required />
                                        </FormGroup>

                                        <FormGroup className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button size="sm" color="success"> Uplode </Button>
                                            <Button size="sm" color="danger" onClick={closeDeleteModal}> Cancel </Button>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ViewServices;