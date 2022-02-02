import React, { createRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useToasts } from "react-toast-notifications";
import { Table, Button, Card, Modal, ModalBody, ModalFooter, CardBody, Breadcrumb, BreadcrumbItem, } from 'reactstrap';
const CategoryList = (props) => {
    const history = useHistory();
    const [categorysList, setcategorysList] = useState([]);
    const [success, setSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [categoryName, setcategoryName] = useState("");
    const [uId, setcategoryId] = useState("");
    const { addToast } = useToasts();
    const [serialNum] = useState(1);


    useEffect(() => {
        axios.get('api/category/GetCategories')
            .then((response) => {
                console.log(response.data);
                setcategorysList(response.data)
            });
    }, [success])


    const handleDetails = (categoryId) => {
        history.push({
            pathname: '/category/details/' + categoryId,
        });

    }

    const handleEdit = (categoryId) => {
        history.push({
            pathname: '/category/edit/' + categoryId,
        });

    }
    const toggleDanger = (en, ar, id) => {
        setcategoryName(en + "(" + ar + ")")
        setcategoryId(id)
        setDeleteModal(true)
    }


    // on Close Delete Modal
    const closeDeleteModal = () => {
        setDeleteModal(false);
        setcategoryName("")
        setcategoryId((""))

    }

    const handleDelete = (id) => {

        axios.delete(`api/Category/Delete/${id}`).then((data) => {
            if (data.data) {

                setDeleteModal(false);
                setcategoryName("")
                setcategoryId((""))
                setSuccess(!success);
                addToast('Delete Successfully', { appearance: 'warning' });
            }
            else {
                addToast('Something Wrong ', { appearance: 'error' });
            }
        })
        setcategoryName("")
        setcategoryId((""))

    }

    const addcategory = () => {
        history.push("/category/create");
    }
    return (
        <div>
            <div className="sf-table-custom">

                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Category List</h4>
                        <Button color="primary" size="sm" className="mr-3" onClick={addcategory} > Add New Category </Button>
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
                                    <th className="text-center"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categorysList?.map((category, i) => <tr key={category.id} >
                                        <td>{serialNum + i}</td>
                                        <td>{category.name_EN}</td>
                                        <td>{category.name_AR}</td>
                                        <td className="text-center">
                                            <Button color="primary" size="sm" className="mr-3" onClick={() => handleDetails(category.id)}> View</Button>
                                            <Button color="secondary" size="sm" className="mr-3" onClick={() => handleEdit(category.id)}> Edit</Button>
                                            <Button color="danger" size="sm" onClick={() => toggleDanger(category.name_EN, category.name_AR, category.id)}> Delete</Button>
                                        </td>

                                        <Modal isOpen={deleteModal} toggle={closeDeleteModal} backdrop="static">
                                            <ModalBody>
                                                <p>Are You Sure to Delete this {categoryName} ? Once Deleted it can't be Undone!</p>
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

export default CategoryList;