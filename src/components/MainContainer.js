import React from 'react';
import {Route} from 'react-router-dom';
import Preview from './schedule/Preview';
import {Container} from 'reactstrap';
import ScheduleBaseContainer from './schedule/ScheduleBaseContainer';
import DraftContainer from './schedule/DraftContainer';

function MainContainer() {
    return (
        <Container>
            <Route path="/" exact component={ScheduleBaseContainer}/>
            <Route path="/preview" component={Preview}/>
            <Route path="/draft" component={DraftContainer}/>
        </Container>
    );
}

export default MainContainer;