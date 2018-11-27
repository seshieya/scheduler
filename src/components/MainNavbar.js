import React, {Component} from 'react';
import {
    Container,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class MainNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavItem>
                        <NavLink exact
                                 to="/"
                                 className="navbar-brand float-left">Scheduler</NavLink>
                    </NavItem>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink exact
                                    to="/"
                                    className="nav-link">Create</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/preview"
                                    className="nav-link">Preview</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/draft"
                                    className="nav-link">Draft</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default MainNavbar;
