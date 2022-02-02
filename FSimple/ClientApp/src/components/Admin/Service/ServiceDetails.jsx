import React, {useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
const ServiceDetails = (props) => {
    const history = useHistory();
    const [serviceModel, setServiceModel] = useState([]);
    const [success, setSuccess] = useState(false);
    const backtolist = () => {
        history.push("/servicesList");
    }
    const serviceId = props.match.params.serviceId;
    useEffect(() => {
        if (serviceId !== 0) {
            axios.get(`api/Service/Get/${serviceId}`).then((data) => {
                setServiceModel(data.data);
            })
        }
    }, [success])


    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4>  Service detail information </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to user list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="2"> <span> Name_EN</span>    </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {serviceModel.name_EN}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col Col md="2"> <span> Name_AR</span> </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {serviceModel.name_AR}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col Col md="2"> <span> Category Name</span> </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {serviceModel.categoryNameEN + "(" + serviceModel.categoryNameAR+")"}</Col>
                            </Row>

                        </CardBody>
                    </Card>
                </div>

            </div>

        </div>
    )
}

export default ServiceDetails;