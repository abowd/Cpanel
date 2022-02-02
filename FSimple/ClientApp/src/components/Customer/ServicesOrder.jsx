import React, { createRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { Row, Col, Badge, FormGroup, Table, Card, Button, Modal, ModalBody, ModalFooter, ModalHeader, CardBody, Breadcrumb, BreadcrumbItem, Progress, Alert } from 'reactstrap';
const ServicesOrder = (props) => {
    const history = useHistory();
    const [serviceList, setserviceList] = useState([]);;
    const [success, setSuccess] = useState(false);
    const [serialNum] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [serviceName, setserviceName] = useState("");
    const [uId, setserviceId] = useState("");
    const [servecsModel, setservecsModel] = useState([]);
    var token = localStorage.getItem("token");

    useEffect(() => {
        axios.get('api/OrderRequest/Getorder',{ headers: { "Authorization": `Bearer ${token}` } }).then(response => {
            setserviceList(response.data)
            });
    }, [success])


    const viewItem = (requstitemId) => {
        history.push({
            pathname: '/myOrder/viewService/' + requstitemId,
        });

    }
    const toggleDanger = (id) => {
        setserviceId(id)
        setDeleteModal(true)
        axios.get(`api/OrderRequest/GetItem/${id}`).then((data) => {
            setservecsModel(data.data)
            });
    }

    // on Close Delete Modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setserviceName("")
        setserviceId((""))

    }

    return (
        <div>
            <div className="sf-table-custom">
                <Card>
                    <CardBody>
                        <div>
                            <h4> My request List</h4>
                            <Progress style={{ height: "0.5rem" }} color="warning" className="mt-3" value={13} he />
                        </div>
                   
                        {
                            serviceList.length=== 0 &&
                            <Alert color="danger" className="mt-5">
                                <h3> No request List. </h3>
                            </Alert>
                        }

                        {
                            serviceList.length != 0 &&

                            <div className="mt-5">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                           {/*<th>User Name</th>*/}
                                           {/*<th>Email</th>*/}
                                           <th>Payment Type</th>
                                            <th>Create Date</th>
                                            {/*<th>Start Date </th>*/}
                                            {/*<th>End Date </th>*/}
                                            <th>Download File </th>
                                            <th>Status </th>
                                            <th>View Item </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            serviceList?.map((service, i) => <tr key={service.id} >
                                                <td>{serialNum + i}</td>
                                                {/*<td>{service.userName}</td>*/}
                                                {/*<td>{service.email}</td>*/}
                                                <td>{service.paymentType}</td>
                                                <td>{service.createDate}</td>
                                                {/*<td>{service.startDate}</td>*/}
                                                {/*<td>{service.endDate}</td>*/}
                                                <a href={service.attachedFile}  download> <Button color="primary" size="sm">Download</Button></a>
                                                <td>
                                                    {service.orderStatus === "New" && <strong className="text-info"> {service.orderStatus} </strong>}
                                                    {service.orderStatus === "Pending" && <strong className="text-warning"> {service.orderStatus} </strong>}
                                                    {service.orderStatus === "Completed" && <strong className="text-success"> {service.orderStatus} </strong>}
                                                    {service.orderStatus === "Rejected" && <strong className="text-danger"> {service.orderStatus} </strong>}
                                                </td>

                                                <td>  <Button color="primary" size="sm" onClick={() => viewItem(service.id)}>View Item</Button> </td>
                                            </tr>
                                            )}
                                    </tbody>
                                </Table>

                                <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">
                                    <ModalHeader style={{ fontSize: "16px" }}>  Request item </ModalHeader>
                                    <ModalBody>
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
                                                <Row className="mb-2">
                                                    <Col md="4"> <span> Download File</span>    </Col>
                                                    <Col md="1"> <span> : </span>    </Col>
                                                    <Col Col md="6">   <a href={service.attachedFile} download> <Button color="primary" size="sm">Download</Button></a></Col>
                                                </Row>

                                            </div>)}


                                        <FormGroup className="mt-5" style={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button size="sm" color="danger" onClick={closeDeleteModal}> Cancel </Button>
                                        </FormGroup>
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

export default ServicesOrder;