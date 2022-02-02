import React, { createRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import { Table, Button, Card, Modal, ModalBody, ModalFooter, CardBody, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
const ServiceList = (props) => {
    const history = useHistory();
    const [servicesList, setservicesList] = useState([]);
    const [success, setSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [serviceName, setserviceName] = useState("");
    const [uId, setserviceId] = useState("");
    const { addToast } = useToasts();
    const [serialNum] = useState(1);


    useEffect(() => {
        axios.get('api/Service/GetServices')
            .then((response) => {
                console.log(response.data);
                setservicesList(response.data)
            });
    }, [success])


    const handleDetails = (serviceId) => {
        history.push({
            pathname: '/service/details/' + serviceId,
        });

    }

    const handleEdit = (serviceId) => {
        history.push({
            pathname: '/service/edit/' + serviceId,
        });

    }
    const toggleDanger = (en,ar, id) => {
        setserviceName(en +"("+ar+")")
        setserviceId(id)
        setDeleteModal(true)
    }


    // on Close Delete Modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setserviceName("")
        setserviceId((""))

    }

    const handleDelete = (id) => {

        axios.delete(`api/Service/Delete/${id}`).then((data) => {
            if (data.data) {

                setDeleteModal(false);
                setserviceName("")
                setserviceId((""))
                setSuccess(!success);
                addToast('Delete Successfully', { appearance: 'warning' });
            }
            else {
                addToast('Something Wrong ', { appearance: 'error' });
            }
        })
        setserviceName("")
        setserviceId((""))

    }

    const addservice = () => {
        history.push("/addservice");
    }
    return (
        <div>
            <div className="sf-table-custom">

                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> All Service List</h4>
                        <Button color="primary" size="sm" className="mr-3" onClick={addservice} > Add New Service</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <Card>
                    <CardBody>
                        <Table bordered responsive size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name_EN </th>
                                    <th> Name_AR </th>
                                    <th> Category</th>
                                    <th className="text-center"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    servicesList?.map((service, i) => <tr key={service.id} >
                                        <td>{serialNum + i}</td>
                                        <td>{service.name_EN}</td>
                                        <td>{service.name_AR}</td>
                                        <td>{service.categoryId}</td>
                                        <td className="text-center">
                                            <Button color="primary" size="sm" className="mr-3" onClick={() => handleDetails(service.id)}> View</Button>
                                            <Button color="secondary" size="sm" className="mr-3" onClick={() => handleEdit(service.id)}> Edit</Button>
                                            <Button color="danger" size="sm" onClick={() => toggleDanger(service.name_EN, service.name_AR, service.id)}> Delete</Button>
                                        </td>

                                        <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">
                                            <ModalBody>
                                                <p>Are You Sure to Delete this {serviceName} ? Once Deleted it can't be Undone!</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" onClick={() => handleDelete(uId)}>YES</Button>
                                                <Button onClick={closeDeleteModal}>NO</Button>
                                            </ModalFooter>
                                        </Modal>


                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

            </div>
        </div>
    )

}

export default ServiceList;