import React from 'react';
import {
    Col,
    Row,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Button
} from 'reactstrap';

function ScheduleForm(props) {
    return (
        <div>
            <h1>Create Schedule</h1>
            <Form id="sc-form">
                <Row form>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="sc-job-number">Job Number</Label>
                            <Input type="text"
                                   placeholder="eg. 107610001"
                                   name="sc-job-number"
                                   id="sc-job-number"
                                   className="form-control"/>
                            <FormText>enter without dashes</FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="sc-job-address">Job Address:</Label>
                            <Input type="text"
                                   name="sc-job-address"
                                   id="sc-job-address"
                                   placeholder="eg. 123 Rainbow Lane, Vancouver"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="sc-job-access">Job Access:</Label>
                            <Input type="textarea"
                                   name="sc-job-access"
                                   id="sc-job-access"
                                   placeholder="eg. key or lockbox info"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col xs="12" md="3">
                        <FormGroup>
                            <Label htmlFor="sc-coordinator">Coordinator:</Label>
                            <Input type="text"
                                   name="sc-coordinator"
                                   id="sc-coordinator"
                                   placeholder="insert name"/>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="3">
                        <FormGroup>
                            <Label htmlFor="sc-coord-phone"> Coordinator Phone:</Label>
                            <Input type="text"
                                   name="sc-coord-phone"
                                   id="sc-coord-phone"/>
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label htmlFor="sc-coord-email">Coordinator Email:</Label>
                            <Input type="text"
                                   name="sc-coord-email"
                                   id="sc-coord-email"
                                   placeholder="eg. coordinator@yourcompany.com"/>
                        </FormGroup>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col xs="12" md="3">
                        <FormGroup>
                            <Label htmlFor="sc-startdate">Schedule Start Date:</Label>
                            <Input type="text"
                                   name="sc-startdate"
                                   id="sc-startdate"
                                   placeholder=""/>
                        </FormGroup>
                    </Col>
                </Row>

                <hr/>

                {props.formRows}

                {/*<input type="button"*/}
                       {/*value="+ Add"*/}
                       {/*onClick={ props.appendRow }/>*/}
                {/*<input type="button"*/}
                       {/*value="- Remove"*/}
                       {/*onClick={ props.removeRow }/>*/}

                <Button outline color="primary" onClick={props.appendRow}>+ Add</Button>
                <Button outline color="primary" onClick={props.removeRow}>- Remove</Button>

                <hr />

                <Button color="primary">Submit</Button>
            </Form>
        </div>
    );

}

export default ScheduleForm;