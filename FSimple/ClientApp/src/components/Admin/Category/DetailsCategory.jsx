import React, {useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Row, Button, Card, Col, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
const DetailsCategory = (props) => {
    const history = useHistory();
    const [categoryModel, setcategoryModel] = useState([]);
    const [success, setSuccess] = useState(false);
    const backtolist = () => {
        history.push("/category/list");
    }
    const categoryId = props.match.params.categoryId;
    useEffect(() => {
        if (categoryId !== 0) {
            axios.get(`api/Category/Get/${categoryId}`).then((data) => {
                setcategoryModel(data.data);
            })
        }
    }, [success])


    return (
        <div>
            <div className="add-from">
                <Breadcrumb className="mb-3">
                    <BreadcrumbItem>
                        <h4> Update Category </h4>
                        <Button color="danger" size="sm" className="mr-3" onClick={backtolist} > Back to category list</Button>
                    </BreadcrumbItem>

                </Breadcrumb>

                <div>
                    <Card>
                        <CardBody>
                            <Row className="mb-2">
                                <Col md="2"> <span> Name_EN</span>    </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {categoryModel.name_EN}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col Col md="2"> <span> Name_AR</span> </Col>
                                <Col md="1"> <span> : </span>    </Col>
                                <Col Col md="6"> {categoryModel.name_AR}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailsCategory;