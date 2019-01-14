import React, { Component } from 'react';
import { Button, Input, Table } from 'reactstrap';
import ScheduleDraftRow from './ScheduleDraftRow';
import PropTypes from 'prop-types';
import moment from 'moment';


class Draft extends Component {
    constructor(props) {

        super(props);

        this.firstRow = 1;

        this.state = {
            rowNumber: this.props.scheduleDraftRows.length,
            rows: Draft.generateRowsView(this.props.scheduleDraftRows),
            startDate: Draft.generateDatesFromStartDate(props.scheduleStartDate, props.scheduleDraftRows)
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

                // increment the index by 1 to get the correct rowNumber for the key
                // todo: think of a better way to incorporate the row number?
                let rowNumber = index + 1;
                rows = rows.concat(Draft.populateRow(rowNumber, ...rowValuesArray));
            });
        }
        return rows;
    }

    static populateRow(rowNumber, typeOfWork, daysNeeded, trade, tradeEmail, comments) {
        return (
            <ScheduleDraftRow key={ rowNumber }
                              typeOfWork={ typeOfWork }
                              daysNeeded={ daysNeeded }
                              trade={ trade }
                              tradeEmail={ tradeEmail }
                              comments={ comments }
                              rowNumber={ rowNumber }/>);
    }

    // parse a date in yyyy-mm-dd format
    // static parseDate(startDate) {
    //     let parts = startDate.split('-');
    //     // constructor: Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    //     // months are 0-based so need to subtract 1
    //     return new Date(parts[0], parts[1] - 1, parts[2])
    // }

    //ISO 8601:  YYYY-MM-DDTHH:mm:ss.sssZ
    //NOTE: choosing to do this in native javascript over using moment as can extract to independent library in the future
    // static generateDatesFromStartDateNative(startDate, scheduleRows) {
    //     let nativeDate = new Date(Draft.parseDate(startDate));
    //     console.log('nativeDate', nativeDate);
    //
    //     scheduleRows.forEach((row, index) => {
    //         let rowNumber = index + 1;
    //
    //         let dayOfWeek = nativeDate.getDay();
    //         let numberOfMillisecondsToIncrement = Draft.skipWeekendsNative(dayOfWeek, true);
    //         let newDate = new Date(nativeDate.getTime() + numberOfMillisecondsToIncrement);
    //
    //         let dateOptions = { weekday: 'short', month: 'short', day: 'numeric'};
    //         row.dayIn = newDate.toLocaleDateString('en-US', dateOptions);
    //
    //         console.log('dayIn', row.dayIn);
    //
    //     });
    // }

    ///ISO 8601:  YYYY-MM-DDTHH:mm:ss.sssZ
    static generateDatesFromStartDate(startDate, scheduleRows, shouldSkipWeekends = false) {
        const formatDate = 'ddd MMM D';

        // parse date in local time
        let date = moment('2019-01-11', 'YYYY-MM-DD');

        let dayInDayOut = [];
        let rowNumber = null;

        scheduleRows.forEach((row, index) => {
            rowNumber = index + 1;

            row.dayIn = date.format(formatDate);

            // deducting 1 day to match up with business logic:
            // 1 business day needed means dayIn and dayOut will be the same day
            // 2 business days means workers are working for two days (eg. if dayIn is Monday then dayOut is Tuesday)
            let businessDaysNeeded = row[`sc-row${rowNumber}-days`] - 1;

            console.log('row[`sc-row${rowNumber}-days`]', row[`sc-row${rowNumber}-days`]);

            if (shouldSkipWeekends) {
                //date.add(businessDaysNeeded, 'days');
                date = Draft.skipWeekends(date, businessDaysNeeded)
                row.dayOut = date.format(formatDate);
            }
            else {
                date.add(businessDaysNeeded, 'days');
                row.dayOut = date.format(formatDate)
            }

            dayInDayOut.push(row);

            // increment to the next date
            if (shouldSkipWeekends) {
                date = Draft.skipWeekends(date, 1);
            }
            else {
                date.add(1, 'days');
            }

            console.log('date at the end of function', date.format(formatDate));

            console.log('dayInDayOut', dayInDayOut);
        });
    }

    /**
     * Adds additional days in order to skip the weekends
     * @param {moment} date
     * @param {number} daysToAdd The number of days needed to add to the date
     * @returns {moment} The moment date after skipping weekends
     */
    static skipWeekends(date, daysToAdd) {
        let daysToIncrement = 0;
        for(let i = 0; i < daysToAdd; i++) {
            date.add(1, 'days');

            // if date lands on a weekend, get the number of days to skip weekend:
            daysToIncrement = this.getDaysToIncrement(date.day());
            date.add(daysToIncrement, 'days');
        }
        return date;
    }

    /**
     * Checks to see if the day of the week is Saturday or Sunday. If it is, it will return the number of days to increment in order to make the day Monday
     * @param {number} dayNumber The day of the week as a number (0 is Sunday, 6 is Saturday)
     * @param {boolean} shouldSkipWeekends
     * @returns {number} The number of days to increment
     */
    static getDaysToIncrement(dayNumber) {
        // if (!shouldSkipWeekends) {
        //     return 0;
        // }

        if (dayNumber === 6) { // Saturday
            return 2; // push to Monday
        }
        else if (dayNumber === 0) { // Sunday
            return 1; // push to Monday
        }
        else {
            return 0; // keep the same day
        }

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
            // todo: change all string concatenation to use template literals
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
                rows: state.rows.concat(<ScheduleDraftRow key={ state.rowNumber }
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

