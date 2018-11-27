import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/schedule.css'
import MainNavbar from './components/MainNavbar';
import MainContainer from "./components/MainContainer";
import {BrowserRouter as Router} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <MainNavbar/>
                    <MainContainer/>
                </div>
            </Router>
        );
    }
}

export default App;
