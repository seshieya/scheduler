import React, { Component } from 'react';
import { Button, Input, Table } from 'reactstrap';
import ScheduleInfoRow from './ScheduleInfoRow';
import PropTypes from 'prop-types';

class Draft extends Component {
    constructor(props) {

        super(props);

        this.firstRow = 1;

        this.state = {
            rowNumber: this.props.scheduleInfoRows.length,
            rows: Draft.generateRowsView(this.props.scheduleInfoRows)
        };

        this.appendRow = this.appendRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.collectDataAndSaveToStore = this.collectDataAndSaveToStore.bind(this);
    }

    static generateRowsView(scheduleRowDataArray) {
        let rows = [];

        // for (let key in scheduleRowData) {
        //     // skip loop if the property is from prototype
        //     if(!scheduleRowData.hasOwnProperty(key)) {
        //         continue;
        //     }
        //     rows = rows.concat(this.populateRow(...scheduleRowData));
        // }

        // todo: remove this undefined check once Draft page is not directly accessible unless store data has been submitted
        if (typeof scheduleRowDataArray !== 'undefined') {

            scheduleRowDataArray.forEach((rowDataObject, index) => {
                //let rowKeysArray = Object.keys(rowDataObject);
                let rowValuesArray = Object.values(rowDataObject);

                // get array of the keys of a row object, then
                // let rowArray = Object.keys(rowDataObject).map(key => [key, rowDataObject[key]]);

                // maps each property-value pair as [key, value] array,
                // and returns all of these [key,value] arrays in a single array
                //let rowArray = Object.entries(rowDataObject);
                //console.log(rowArray);

                // increment the index by 1 to get the correct rowNumber
                // todo: think of a better way to incorporate the row number?
                let rowNumber = index + 1;
                rows = rows.concat(this.populateRow(rowNumber, ...rowValuesArray));
            });
        }
        return rows;
    }

    static populateRow(rowNumber, typeOfWork, daysNeeded, trade, tradeEmail, comments) {
        return (
            <ScheduleInfoRow key={ rowNumber }
                             typeOfWork={ typeOfWork }
                             daysNeeded={ daysNeeded }
                             trade={ trade }
                             tradeEmail={ tradeEmail }
                             comments={ comments }
                             rowNumber={ rowNumber } />);
    }

    // todo: move to reducer?? this function is slightly different because there is no start date...
    collectDataAndSaveToStore() {
        let coordInputs = document.getElementsByClassName("coordinatorData");
        let jobInputs = document.getElementsByClassName("jobData");

        let scheduleData = {};
        let coordData = {};
        let jobData = {};

        scheduleData['rowData'] = [];
        for (let rowNumber = 1; rowNumber <= this.state.rowNumber; rowNumber++) {
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
        this.props.updateCoordinator(coordData);
        this.props.updateJob(jobData);
        this.props.updateSchedule(scheduleData);
        this.props.updateNumberOfRows();

        //TODO: also need to update the start date in the store. NEED TO HAVE THE VALUES REPOPULATE ON THE CREATION PAGE, PLUS NEED TO MAKE DATE GENERATION FUNCTION
    }

    // todo: refactor into the reducer if there's value? because this is also used in SchedulerBase, but they return different states
    async appendRow() {
        //await this.props.incrementRowNumber(this.props.numberOfRows);

        this.setState(state => {
            return {
                rowNumber: state.rowNumber + 1
            }
        });

        this.setState((state) => {
            return {
                rows: state.rows.concat(<ScheduleInfoRow key={ state.rowNumber }
                                                         rowNumber={ state.rowNumber }/>)
            };
        });
    }

    // todo: refactor into the reducer if there's value? because this is also used in SchedulerBase, but they return different states
    removeRow() {
        if (this.state.rowNumber !== this.firstRow) {
            //this.props.decrementRowNumber(this.props.numberofRows);

            this.setState(existingState => {
                return {
                    rowNumber: existingState.rowNumber - 1,
                    rows: existingState.rows.slice(0, existingState.rows.length - 1)
                };
            });
        }
    }

    save(action) {

    }

    render() {
        return (
            <div>
                <h1>Draft</h1>
                <h2>Coordinator Information</h2>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.coordinatorInfo['sc-coordinator'] }
                                   id="sc-coordinator"
                                   className="coordinatorData"/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.coordinatorInfo['sc-coord-phone'] }
                                   id="sc-coord-phone"
                                   className="coordinatorData"/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.coordinatorInfo['sc-coord-email'] }
                                   id="sc-coord-email"
                                   className="coordinatorData"/>
                        </td>
                    </tr>
                    </tbody>
                </Table>

                <h2>Job Information</h2>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Job Number</th>
                        <th>Address</th>
                        <th>Access</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.jobInfo['sc-job-number'] }
                                   id="sc-job-number"
                                   className="jobData"/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.jobInfo['sc-job-address'] }
                                   id="sc-job-address"
                                   className="jobData"/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.jobInfo['sc-job-access'] }
                                   id="sc-job-access"
                                   className="jobData"/>
                        </td>
                    </tr>
                    </tbody>

                </Table>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Type of Work</th>
                        <th>Trade</th>
                        <th>Trade Email</th>
                        <th>Date In</th>
                        <th>Date Out</th>
                        <th>Days Needed</th>
                        <th>Comments</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.rows }
                    </tbody>
                </Table>

                <Button outline color="primary" onClick={ this.appendRow }>+ Add</Button>
                <Button outline color="primary" onClick={ this.removeRow }>- Remove</Button>

                <hr/>

                <Button color="primary" onClick={ this.back }>Back</Button>
                <Button color="primary" onClick={ this.collectDataAndSaveToStore }>Submit</Button>
            </div>
        );
    }
}

Draft.propTypes = {
    numberOfRows: PropTypes.number,
    coordinatorInfo: PropTypes.object,
    jobInfo: PropTypes.object,
    scheduleInfoRows: PropTypes.array
    // todo: need to add proptype to scheduleStartDate
};

export default Draft;

