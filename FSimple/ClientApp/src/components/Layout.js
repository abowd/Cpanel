import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Login } from './Default_Layout/Login';


export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        const user = "abdalla";
        return (
            <div>

                {/*{*/}
                {/*    user === "abdalla" ?*/}
                {/*        <>*/}
                {/*            <Login></Login>*/}
                {/*        </>*/}
                {/*        :*/}
                {/*        <>*/}
                {/*            <NavMenu />*/}
                {/*            <Container>*/}
                {/*                {this.props.children}*/}
                {/*            </Container>*/}
                {/*        </>*/}
                {/*}*/}

                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
