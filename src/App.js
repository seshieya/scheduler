import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/schedule.css'
import MainNavbar from './components/MainNavbar';
import ScheduleBase from './components/schedule/ScheduleBase';
import { Container } from 'reactstrap';
import MainContainer from "./components/MainContainer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <MainNavbar/>
                    <MainContainer/>
                </header>
            </div>
        );
    }
}

export default App;
