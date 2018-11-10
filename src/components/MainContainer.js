import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ScheduleBase from './schedule/ScheduleBase';
import Preview from './schedule/Preview';
import Draft from './schedule/Draft'
import {Container} from 'reactstrap';

function MainContainer() {
    return (
        <Router>
            <Container>
                <Route path="/" exact component={ScheduleBase}/>
                <Route path="/preview" component={Preview}/>
                <Route path="/draft" component={Draft}/>
            </Container>
        </Router>
    );
}

export default MainContainer;