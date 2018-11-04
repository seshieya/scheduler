import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/schedule.css'
import MainNavbar from './components/MainNavbar';
import ScheduleForm from './components/schedule/ScheduleForm';
import { Container } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <MainNavbar/>
                    <Container>
                        <ScheduleForm/>
                    </Container>
                </header>
            </div>
        );
    }
}

export default App;
