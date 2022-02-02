import React, { Component } from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
export default class UserMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const role = localStorage.getItem("role");
        return (
            role == "Admin" ?
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/category/list">Category</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/servicesList">Service</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/userList">User</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/userRequest/newOrder"> New Orders</NavLink>
                    </NavItem>                   <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/order"> All Orders</NavLink>
                    </NavItem>
                </>
                :
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/myOrder/list">My orders</NavLink>
                    </NavItem>
                </>
        );
    }
}
