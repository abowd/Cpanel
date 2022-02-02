import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem, FormGroup } from 'reactstrap';
const ViewItemNew = (props) => {
    const history = useHistory();
    const [servecsModel, setservecsModel] = useState([]);
    const [success, setSuccess] = useState(false);
    const backtolist = () => {
        history.push("/userRequest/newOrder");
    }
    const newreqId = props.match.params.newreqId;

    useEffect(() => {
        if (newreqId !== 0) {
            axios.get(`api/OrderRequest/GetItem/${newreqId}`).then((data) => {
                setservecsModel(data.data)
            });
        }
    }, [success])


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
                                    {service.attachedFile === null ?
                                        <Row className="mb-2">
                                            <Col md="4"> <span> Download File</span>    </Col>
                                            <Col md="1"> <span> : </span>    </Col>
                                            <Col Col md="6">   <p className="text-danger"> No File </p> </Col>
                                        </Row> :
                                        <Row className="mb-2">
                                            <Col md="4"> <span> Download File</span>    </Col>
                                            <Col md="1"> <span> : </span>    </Col>
                                            <Col Col md="6">   <a href={service.attachedFile} download> <Button color="primary" size="sm">Download</Button></a></Col>
                                        </Row>
                                    }

                                </div>)}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ViewItemNew;