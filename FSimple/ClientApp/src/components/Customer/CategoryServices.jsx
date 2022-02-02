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
    const [serviceName, setserviceName] = useState("");
    const [uId, setserviceId] = useState("");
    const { addToast } = useToasts();
    const [serialNum] = useState(1);
    let [checked, setChecked] = useState([]);
    let [count, setcount] = useState(0);

    let reqId = 0;
    useEffect(() => {
        let demoList = JSON.parse(localStorage.getItem("itemCart")) || [];
        setChecked(demoList)
        console.log("tt", demoList);
    }, [success])

    const removeitem = (index) => {
        let demoList = JSON.parse(localStorage.getItem('itemCart'));
        demoList.splice(index, 1);
        localStorage.removeItem('itemCart');
        localStorage.setItem('itemCart', JSON.stringify(demoList));
        setSuccess(!success)
    }
    const addnewservice = () => {
        history.push("/addNewService");

    }
    var token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const handleSubmit = (event) => {

        event.preventDefault();
        const subdata = new FormData(event.target);
        axios.post('api/OrderRequest/NewOrderRequest', subdata, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
            reqId = response.data.id;
            if (response.data.id !== 0) {
                checked.map((item, index) => {
                    const sabdata = {
                        ServiceId: item.serviceId,
                        EndDate: item.endDate,
                        StartDate: item.startDate,
                        Name_AR: item.name_AR,
                        Name_EN: item.name_EN,
                        RequestId: reqId
                    }
                    axios.post('api/OrderRequest/itemRequest', sabdata).then(response => {
                        if (response.data.id != 0) {
                            setcount(count++)
                        }
                        else {
                            addToast('Something Wrong', { appearance: 'error' });
                        }
                    });
                })

                addToast('Service Item Order Confirm Successfully', { appearance: 'success' });
                localStorage.removeItem("itemCart");
                setSuccess(!success)
                reqId = 0;
                setcount(0)
            }
         
            else {
                addToast('Something Wrong', { appearance: 'error' });
            }
        });

    }



    return (
        <div>
            <div className="sf-table-custom">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Category Services</h4>
                        <Button className="mr-3" size="sm" color="info" onClick={addnewservice}> Add New Service </Button>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-md-12">

                                <Form ref={myForm} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label for="exampleSelect">Select pay type</Label>
                                                <Input type="select" name="PaymentType" id="PaymentType" required>
                                                    <option value=""> Select pay type </option>
                                                    <option value="Apple Pay"> Apple Pay</option>
                                                    <option value="Bank transfer"> Bank transfer</option>
                                                    <option value="Credit card"> Credit card</option>

                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label for="File">Attached File</Label>
                                                <Input type="file" name="File" id="File" required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                {checked.length !== 0 ?
                                                    <Button size="sm" color="success"> Confirm Order </Button> :
                                                    <h5 className="text-danger"> Add New Service  </h5>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>




                                </Form>
                                {/*<FormGroup >*/}
                                {/*    <Label for="StartDate">Start Date</Label>*/}
                                {/*    <Input type="date" name="StartDate" id="StartDate" required />*/}
                                {/*</FormGroup>*/}

                                {/*<FormGroup>*/}
                                {/*    <Label for="EndDate">End Date</Label>*/}
                                {/*    <Input type="date" name="EndDate" id="EndDate" required />*/}
                                {/*</FormGroup>*/}


                                <Table striped className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>English Name</th>
                                            <th>Arabic Name</th>
                                            <th> Start Date </th>
                                            <th> End Date </th>
                                            {role !== "Admin" &&
                                                <th>Action </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            checked?.map((service, i) => <tr key={service.id} >
                                                <td>{serialNum + i}</td>
                                                <td>{service.name_EN}</td>
                                                <td>{service.name_AR}</td>
                                                <td>{service.startDate}</td>
                                                <td>{service.endDate}</td>
                                                {role !== "Admin" &&
                                                    <td> <Button color="danger" size="sm" onClick={() => removeitem(i)}> Remove Item</Button> </td>
                                                }

                                            </tr>
                                            )}
                                    </tbody>


                                </Table>





                            </div>
                        </div>


                    </CardBody>
                </Card>
            </div>
        </div>
    )

}

export default CategoryServices;