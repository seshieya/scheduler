import React from 'react';
import {Route} from 'react-router-dom';
import Preview from './schedule/Preview';
import Draft from './schedule/Draft'
import {Container} from 'reactstrap';
import ScheduleBaseContainer from './schedule/ScheduleBaseContainer';

function MainContainer() {
    return (
        <Container>
            <Route path="/" exact component={ScheduleBaseContainer}/>
            <Route path="/preview" component={Preview}/>
            <Route path="/draft" component={Draft}/>
        </Container>
    );
}

export default MainContainer;