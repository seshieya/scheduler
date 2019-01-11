import React, { Component } from 'react';
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
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';



class ScheduleForm extends Component {
    constructor(props) {
        super(props);

        this.collectDataAndSaveToStore = this.collectDataAndSaveToStore.bind(this);

        // schedule start date using the date picker:
        this.state = { date: null };
    }

    collectDataAndSaveToStore() {
        let coordInputs = document.getElementsByClassName("coordinatorData");
        let jobInputs = document.getElementsByClassName("jobData");

        let scheduleData = {};
        let coordData = {};
        let jobData = {};

        scheduleData['rowData'] = [];
        for (let rowNumber = 1; rowNumber <= this.props.numberOfRows; rowNumber++) {
            // todo: change all strings to use template literals
            let inputs = document.getElementsByClassName(`sc-rows-${rowNumber}`);

            console.log(inputs);

            let elements = {};
            for (let element of inputs) {
                elements[element.id] = element.value;
            }
            // push the newly created elements object into scheduleData array
            scheduleData['rowData'].push(elements);
        }

        let startDate = document.getElementById("sc-startdate");
        scheduleData['startDate'] = startDate.value;

        for (let i = 0; i < coordInputs.length; i++) {
            coordData[coordInputs[i].id] = coordInputs[i].value;
        }

        for (let i = 0; i < jobInputs.length; i++) {
            jobData[jobInputs[i].id] = jobInputs[i].value;
        }

        console.log("scheduleData", scheduleData);
        console.log("coordData", coordData);
        console.log("jobData", jobData);

        // pass data back to parent component by calling the prop functions passed down from the parent
        this.props.collectCoordinatorInfo(coordData);
        this.props.collectJobInfo(jobData);
        this.props.collectScheduleInfo(scheduleData);
        this.props.updateNumberOfRowsInStore();
    }

    render() {
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
                                       className="jobData"/>
                                <FormText>enter without dashes</FormText>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label htmlFor="sc-job-address">Job Address:</Label>
                                <Input type="text"
                                       name="sc-job-address"
                                       id="sc-job-address"
                                       className="jobData"
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
                                       className="jobData"
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
                                       className="coordinatorData"
                                       placeholder="insert name"/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="3">
                            <FormGroup>
                                <Label htmlFor="sc-coord-phone"> Coordinator Phone:</Label>
                                <Input type="text"
                                       name="sc-coord-phone"
                                       id="sc-coord-phone"
                                       className="coordinatorData"/>
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="6">
                            <FormGroup>
                                <Label htmlFor="sc-coord-email">Coordinator Email:</Label>
                                <Input type="text"
                                       name="sc-coord-email"
                                       id="sc-coord-email"
                                       className="coordinatorData"
                                       placeholder="eg. coordinator@yourcompany.com"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col xs="12" md="3">
                            <FormGroup>
                                <Label htmlFor="sc-startdate">Schedule Start Date:</Label>
                                {/*<Input type="text"*/}
                                       {/*name="sc-startdate"*/}
                                       {/*id="sc-startdate"*/}
                                       {/*placeholder=""/>*/}
                                <SingleDatePicker
                                    date={this.state.date} // momentPropTypes.momentObj or null
                                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                    focused={this.state.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                    id="sc-startdate" // PropTypes.string.isRequired,
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr/>

                    { this.props.formRowData }

                    <Button outline color="primary" onClick={ this.props.appendRow }>+ Add</Button>
                    <Button outline color="primary" onClick={ this.props.removeRow }>- Remove</Button>

                    <hr/>

                    <Button color="primary" onClick={ this.collectDataAndSaveToStore }>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default ScheduleForm;