import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Login } from './components/Default_Layout/Login';
import AddUser from './components/Admin/AddNewUser/AddUser';
import UserList from './components/Admin/AddNewUser/UserList';
import EditUser from './components/Admin/AddNewUser/EditUser';
import UserDetails from './components/Admin/AddNewUser/UserDetails';

import ServiceList from './components/Admin/Service/ServiceList';
import AddService from './components/Admin/Service/AddService';
import EditService from './components/Admin/Service/EditService';
import ServiceDetails from './components/Admin/Service/ServiceDetails';

import CategoryList from './components/Admin/Category/CategoryList';
import AddCategory from './components/Admin/Category/AddCategory';
import EditCategory from './components/Admin/Category/EditCategory';
import DetailsCategory from './components/Admin/Category/DetailsCategory';


import NewOrder from './components/Admin/NewOrder/NewOrder';
import AllOrder from './components/Admin/NewOrder/AllOrder';
import ViewItem from './components/Admin/NewOrder/ViewItem';
import ViewItemNew from './components/Admin/NewOrder/ViewItemNew';


import CategoryServices from './components/Customer/CategoryServices';
import ServicesOrder from './components/Customer/ServicesOrder';
import AddNewService from './components/Customer/AddNewService';
import ViewServices from './components/Customer/ViewService';

import ProtectedRoute from './components/ProtectedRoute';
import {ToastProvider} from "react-toast-notifications";
export class Routes extends Component {
    static displayName = Route.name;

    render() {
        const role = localStorage.getItem("role");
        return (
            <div>
                <ToastProvider autoDismiss={true}>             
                <ProtectedRoute  path='/home' component={Home} />
                <Route path='/login' component={Login} />
                <ProtectedRoute path='/addUser' component={AddUser} />
                <ProtectedRoute path='/userList' component={UserList} />
                <ProtectedRoute path='/user/edit/:userId' component={EditUser} />
                <ProtectedRoute path='/user/details/:userId' component={UserDetails} />


                <ProtectedRoute path='/servicesList' component={ServiceList} />
                <ProtectedRoute path='/addservice' component={AddService} />
                <ProtectedRoute path='/service/edit/:serviceId' component={EditService} />
                <ProtectedRoute path='/service/details/:serviceId' component={ServiceDetails} />

                <ProtectedRoute path='/category/list' component={CategoryList} />
                <ProtectedRoute path='/category/create' component={AddCategory} />
                <ProtectedRoute path='/category/edit/:categoryId' component={EditCategory} />
                 <ProtectedRoute path='/category/details/:categoryId' component={DetailsCategory} />

                 <ProtectedRoute path='/userRequest/newOrder' component={NewOrder} />
                 <ProtectedRoute path='/order' component={AllOrder} />

                  <ProtectedRoute path='/myOrder/list' component={ServicesOrder} />
                    <ProtectedRoute path='/addNewService' component={AddNewService} />
                    <ProtectedRoute path='/myOrder/item/:reqId' component={ViewItem} />
                    <ProtectedRoute path='/myOrder/newitem/:newreqId' component={ViewItemNew} />
                    <ProtectedRoute path='/myOrder/viewService/:requstitemId' component={ViewServices} />
                    {
                        role !== "Admin" ? <>
                            <ProtectedRoute exact path='/' component={CategoryServices} />
                        </> :
                            <ProtectedRoute exact path='/' component={AddNewService} />

                    }
                   
                    
                </ToastProvider>
            </div>
        );
    }
}
