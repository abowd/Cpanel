import React, { createRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import { Form, FormGroup, Label, Input, FormText, Row, Col, Badge, Table, Card, Button, Modal, ModalBody, ModalFooter, ModalHeader, CardBody, Breadcrumb, BreadcrumbItem, Progress, Alert } from 'reactstrap';
const NewOrder = (props) => {
    const history = useHistory();
    const [neworderList, setneworderList] = useState([]);;
    const [success, setSuccess] = useState(false);
    const [serialNum] = useState(1);
    const myForm = createRef();
    const { addToast } = useToasts();
    const [deleteModal, setDeleteModal] = useState(false);
    const [serviceName, setserviceName] = useState("");
    const [uId, setserviceId] = useState("");



    useEffect(() => {
        axios.get('api/OrderRequest/Getneworder').then(response => {
            setneworderList(response.data)
        });
    }, [success])


    const toggleDanger = (en,id) => {
        setserviceName(en)
        setserviceId(id)
        setDeleteModal(true)
    }

    // on Close Delete Modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setserviceName("")
        setserviceId((""))

    }

   
    const handleSubmit = (event) => {
        event.preventDefault();
        const subdata = new FormData(event.target);
        axios.post('api/OrderRequest/OrderStatus', subdata).then(response => {
            console.log(response);
            if (response.data.id != 0) {
                setDeleteModal(false);
                setSuccess(!success);
                addToast('Change status successfully', { appearance: 'success' });
            }
            else {
                addToast('Something Wrong', { appearance: 'error' });
            }
        });

    }

    const viewItem = (newreqId) => {
        history.push({
            pathname: '/myOrder/newitem/' + newreqId,
        });

    }
    return (
        <div>
            <div className="sf-table-custom">
                <Card>
                    <CardBody>
                        <div>
                            <h4> New Request List</h4>
                            <Progress style={{ height: "0.5rem" }} color="warning" className="mt-3" value={13} he />
                        </div>

                        {
                            neworderList.length === 0 &&
                            <Alert color="danger" className="mt-5">
                                <h3> No Order List. </h3>
                            </Alert>
                        }

                        {
                            neworderList.length != 0 &&

                            <div className="mt-5">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {/*     <th>Service</th>*/}
                                            <th>User</th>
                                            <th>Payment Type</th>
                                            <th>Create Date </th>
                                            {/*<th>Start Date </th>*/}
                                            {/*<th>End Date </th>*/}
                                            <th>Download File </th>
                                            <th>Status </th>
                                            <th>View Item </th>
                                            <th className="text-center"> Change Status </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            neworderList?.map((neworder, i) => <tr key={neworder.id} >
                                                <td>{serialNum + i}</td>
                                                {/*       <td>{neworder.serviceName}</td>*/}
                                                <td>ID: {neworder.userId} <br />Name: {neworder.userName} <br />Email: {neworder.email}  </td>
                                                <td>{neworder.paymentType}</td>
                                                <td>{neworder.createDate}</td>
                                                {/*<td>{neworder.startDate}</td>*/}
                                                {/*<td>{neworder.endDate}</td>*/}
                                                <td>
                                                    <a href={neworder.attachedFile} download> <Button color="primary" size="sm">Download</Button></a>
                                                </td>
                                                <td>
                                                    {neworder.orderStatus === "New" && <strong className="text-info"> {neworder.orderStatus} </strong>}
                                                    {neworder.orderStatus === "Pending" && <strong className="text-warning"> {neworder.orderStatus} </strong>}
                                                    {neworder.orderStatus === "Completed" && <strong className="text-success"> {neworder.orderStatus} </strong>}
                                                    {neworder.orderStatus === "Rejected" && <strong className="text-danger"> {neworder.orderStatus} </strong>}
                                                </td>
                                                <td className="text-center">  <Button color="info" size="sm" onClick={() => toggleDanger(neworder.serviceName, neworder.id)}>Change</Button> </td>
                                                <td> <> <Button color="primary" size="sm" onClick={() => viewItem(neworder.id)}>View Item</Button></> </td>
                                            </tr>
                                            )}
                                    </tbody>
                                </Table>
                            </div>

                        }

                    </CardBody>



                    <Modal isOpen={deleteModal} toggle={closeDeleteModal}>
                        <ModalHeader style={{ fontSize: "16px" }}> {serviceName}  </ModalHeader>

                        <ModalBody>

                            <Form ref={myForm} onSubmit={handleSubmit}>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Input type="hidden" id="Id" name="Id" value={uId} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleSelect"> request status </Label>
                                    <Input type="select" name="OrderStatus" id="OrderStatus" required>
                                        <option value=""> Select request status </option>
                                        <option value="New"> New </option>
                                        <option value="Pending"> Pending </option>
                                        <option value="Completed"> Completed </option>
                                        <option value="Rejected"> Rejected </option>

                                    </Input>
                                </FormGroup>
                                <FormGroup className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button size="sm" color="success"> Confirm  request status </Button>
                                    <Button size="sm" color="danger" onClick={closeDeleteModal}> Cancel </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>

                </Card>
            </div>
        </div>
    )

}

export default NewOrder;