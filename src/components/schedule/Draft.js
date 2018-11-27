import React, { Component } from 'react';
import {
    Table,
    Input,
    Button } from 'reactstrap';
import { incrementRowNumber, decrementRowNumber } from '../../redux/actions/SchedulerActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        numberOfRows: state.numberOfRows
    };
};

const mapDispatchToProps = {
    incrementRowNumber,
    decrementRowNumber
};


const ScheduleInfoRow = () => (
    <tr>
        <td>
            <Input type="text" />
        </td>
        <td>
            <Input type="text" />
        </td>
        <td>
            <Input type="text" />
        </td>
        <td>
            <Input type="text" />
        </td>
        <td>
            <Input type="text" />
        </td>
        <td>
            <Input type="text" />
        </td>
        <td>
            <Input type="textarea" />
        </td>
    </tr>
);


// function ScheduleInfoRow() {
//     return (<tr>
//         <td>
//             <Input type="text" />
//         </td>
//         <td>
//             <Input type="text" />
//         </td>
//         <td>
//             <Input type="text" />
//         </td>
//         <td>
//             <Input type="text" />
//         </td>
//         <td>
//             <Input type="text" />
//         </td>
//         <td>
//             <Input type="text" />
//         </td>
//         <td>
//             <Input type="textarea" />
//         </td>
//     </tr>);
// }

class Draft extends Component {
    constructor(props) {

        super(props);

        this.firstRow = 1;

        this.state = {
            rows: Draft.generateRows(this.props.numberOfRows)
        };

        this.appendRow = this.appendRow.bind(this);
        this.removeRow = this.removeRow.bind(this);

    }

    static generateRows(numberOfRows) {
        let rows = [];

        for(let i = 1; i <= numberOfRows; i++) {
            rows = rows.concat(<ScheduleInfoRow key={i} />);
        }

        return rows;
    }

    // todo: refactor into the reducer if there's value? because this is also used in SchedulerBase
    async appendRow() {
        await this.props.incrementRowNumber(this.props.numberOfRows);

        this.setState((state) => {
            return { rows: state.rows.concat(<ScheduleInfoRow key={this.props.numberOfRows}/>) };
        });
    }

    // todo: refactor into the reducer if there's value? because this is also used in SchedulerBase
    removeRow() {
        const currentRowNumber = this.props.numberOfRows;
        const existingRows = this.state.rows;

        if (currentRowNumber !== this.firstRow) {
            this.props.decrementRowNumber(this.props.numberofRows);

            this.setState((state) => {
                return { rows: state.rows.slice(0, state.rows.length - 1)}
            });
        }
    }


    render() {
        return(
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
                            <Input type="text" />
                        </td>
                        <td>
                            <Input type="text" />
                        </td>
                        <td>
                            <Input type="text" />
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
                            <Input type="text" />
                        </td>
                        <td>
                            <Input type="text" />
                        </td>
                        <td>
                            <Input type="text" />
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

                <Button outline color="primary" onClick={this.appendRow}>+ Add</Button>
                <Button outline color="primary" onClick={this.removeRow}>- Remove</Button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);