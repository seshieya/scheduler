import React, { Component } from 'react';
import {
    Table,
    Input,
    Button
} from 'reactstrap';
import { incrementRowNumber, decrementRowNumber } from '../../redux/actions/SchedulerActions';
import { connect } from 'react-redux';
import ScheduleInfoRow from './ScheduleInfoRow';

const mapStateToProps = (state) => {
    return {
        numberOfRows: state.numberOfRows,
        coordinatorInfo: state.coordinatorInfo,
        jobInfo: state.jobInfo,
        scheduleInfo: state.scheduleInfo
    };
};

const mapDispatchToProps = {
    incrementRowNumber,
    decrementRowNumber
};

// const ScheduleInfo = () =>(
//         <tr>
//             <td>
//                 <Input type="text"/>
//             </td>
//             <td>
//                 <Input type="text"/>
//             </td>
//             <td>
//                 <Input type="text"/>
//             </td>
//             <td>
//                 <Input type="text"/>
//             </td>
//             <td>
//                 <Input type="text"/>
//             </td>
//             <td>
//                 <Input type="text"/>
//             </td>
//             <td>
//                 <Input type="textarea"/>
//             </td>
//         </tr>
//     );


class Draft extends Component {
    constructor(props) {

        super(props);

        this.firstRow = 1;

        this.state = {
            rows: Draft.generateRows(this.props.scheduleInfo['rowData'])
        };

        this.appendRow = this.appendRow.bind(this);
        this.removeRow = this.removeRow.bind(this);

    }

    static generateRows(scheduleRowDataArray) {
        let rows = [];

        // for (let key in scheduleRowData) {
        //     // skip loop if the property is from prototype
        //     if(!scheduleRowData.hasOwnProperty(key)) {
        //         continue;
        //     }
        //     rows = rows.concat(this.generatePopulatedRow(...scheduleRowData));
        // }

        // todo: remove this undefined check once Draft page is not directly accessible unless store data has been submitted
        if (scheduleRowDataArray !== undefined) {
            scheduleRowDataArray.forEach((rowDataObject, index) => {
                let rowValuesArray = Object.values(rowDataObject);
                rows = rows.concat(this.generatePopulatedRow(index, ...rowValuesArray));
            });
        }
        return rows;
    }

    static generatePopulatedRow(index, typeOfWork, daysNeeded, trade, tradeEmail, comments) {
        return (
            <ScheduleInfoRow key={ index }
                             typeOfWork={ typeOfWork }
                             daysNeeded={ daysNeeded }
                             trade={ trade }
                             tradeEmail={ tradeEmail }
                             comments={ comments }
            />);
    }

    // todo: refactor into the reducer if there's value? because this is also used in SchedulerBase
    async appendRow() {
        await this.props.incrementRowNumber(this.props.numberOfRows);

        this.setState((state) => {
            return { rows: state.rows.concat(<ScheduleInfoRow key={ this.props.numberOfRows }/>) };
        });
    }

    // todo: refactor into the reducer if there's value? because this is also used in SchedulerBase
    removeRow() {
        const currentRowNumber = this.props.numberOfRows;

        if (currentRowNumber !== this.firstRow) {
            this.props.decrementRowNumber(this.props.numberofRows);

            this.setState((existingState) => {
                return { rows: existingState.rows.slice(0, existingState.rows.length - 1) }
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
                                   defaultValue={ this.props.coordinatorInfo['sc-coordinator'] }/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.coordinatorInfo['sc-coord-phone'] }/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.coordinatorInfo['sc-coord-email'] }/>
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
                                   defaultValue={ this.props.jobInfo['sc-job-number'] }/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.jobInfo['sc-job-address'] }/>
                        </td>
                        <td>
                            <Input type="text"
                                   defaultValue={ this.props.jobInfo['sc-job-access'] }/>

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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);