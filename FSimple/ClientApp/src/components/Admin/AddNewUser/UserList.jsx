import React, { createRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import { Table, Button, Card, Modal, ModalBody, ModalFooter, CardBody, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
const UserList = (props) => {
    const history = useHistory();
    const [userList, setuserList] = useState([]);
    const [success, setSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [userName, setuserName] = useState("");
    const [uId, setuserId] = useState("");
    const { addToast } = useToasts();
    const [serialNum] = useState(1);
    const adduser = () => {
        history.push("/addUser");
    }

    useEffect(() => {
        axios.get('api/User/list')
            .then((response) => {
                console.log(response.data);
                setuserList(response.data)
            });
    }, [success])


    const handleDetails = (userId) => {
        history.push({
            pathname: '/user/details/' + userId,
        });

    }

    const handleEdit = (userId) => {
        history.push({
            pathname: '/user/edit/' + userId,
        });

    }
    const toggleDanger = (name, id) => {
        setuserName(name)
        setuserId(id)
        setDeleteModal(true)
    }


    // on Close Delete Modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setuserName("")
        setuserId((""))

    }

    const handleDelete = (id) => {

        axios.get(`api/User/Delete/${id}`).then((data) => {
            if (data.data) {

                setDeleteModal(false);
                setuserName("")
                setuserId((""))
                setSuccess(!success);
                addToast('Delete Successfully', { appearance: 'warning' });
            }
            else {
                addToast('Something Wrong ', { appearance: 'error' });
            }
        })
        setuserName("")
        setuserId((""))
       
    }


    return (
        <div>
            <div className="sf-table-custom">

                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> All User List</h4>
                        <Button color="primary" size="sm" className="mr-3" onClick={adduser} > Add New User</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <Card>
                    <CardBody>
                        <Table bordered responsive size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th> Email</th>
                                    <th> Phone Number</th>
                                    <th className="text-center"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userList?.map((user, i) => <tr key={user.id} >
                                        <td>{serialNum + i}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td className="text-center">
                                            <Button color="primary" size="sm" className="mr-3" onClick={() => handleDetails(user.id)}> View</Button>
                                            <Button color="secondary" size="sm" className="mr-3" onClick={() => handleEdit(user.id)}> Edit</Button>
                                            <Button color="danger" size="sm" onClick={() => toggleDanger(user.fullName, user.id)}> Delete</Button>
                                        </td>

                                        <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">
                                            <ModalBody>
                                                <p>Are You Sure to Delete this {userName} ? Once Deleted it can't be Undone!</p>
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

export default UserList;