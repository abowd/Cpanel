import React, { createRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
const UserDetails = (props) => {
    const history = useHistory();
    const [userModel, setuserModel] = useState([]);
    const [success, setSuccess] = useState(false);
    const backtolist = () => {
        history.push("/userList");
    }
    const userId = props.match.params.userId;
 
    useEffect(() => {
        if (userId !== "") {
            axios.get(`api/User/Get/${userId}`).then((data) => {
                setuserModel(data.data)
            })
        }
    })

    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4>  User detail information </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to user list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="2"> <span> Full Name</span>    </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {userModel.fullName}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col Col md="2"> <span> Email</span> </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {userModel.email}</Col>
                            </Row>

                        </CardBody>
                    </Card>
                </div>

            </div>

        </div>
    )
}

export default UserDetails;