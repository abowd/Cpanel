import React, { Component } from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserMenu from './UserPermittedMenu'
//function UserNavMenu() {
//    const isAuthenticated = localStorage.getItem("token");
//    handleLogout = (event) => {
//        event.preventDefault();

//        //axios.get('api/Auth/Logout').then(response => {
//        //    console.log(response);
//        //    if (response.data) {
//                localStorage.removeItem("token");
//                localStorage.setItem("role");
//        //    }

//        //});
//    }
//    return (
//        isAuthenticated != null ?
//            <NavItem>
//                <button onClick={this.handleLogout} className="text-dark">Logout</button>
//            </NavItem>
//            : <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
//            </NavItem>
//    );
//}

//export default UserNavMenu;

export default class UserNavMenu extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout = (event) => {
        event.preventDefault();

        axios.get('api/Auth/Logout').then(response => {
            console.log(response);
            if (response.data) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.reload();
            }
        });
    }
    render() {
        const isAuthenticated = localStorage.getItem("token");
        return (
            isAuthenticated != null ?
                <>
                    <UserMenu />
                    <NavItem>
                        <NavLink onClick={this.handleLogout} className="text-dark" style={{ cursor: "pointer" }}>Logout</NavLink>
                    </NavItem>
                </>
                : <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>

        );
    }
}
