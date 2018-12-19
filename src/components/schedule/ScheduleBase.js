import React, { Component } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleFormRow from './ScheduleFormRow';
import PropTypes from 'prop-types';


class ScheduleBase extends Component {
    constructor(props) {
        super(props);

        this.initialRow = 1;

        this.state = {
            rows: [<ScheduleFormRow key={ this.initialRow } rowNumber={ this.initialRow }/>]
        };

        this.onAppendRow = this.onAppendRow.bind(this);
        this.onRemoveRow = this.onRemoveRow.bind(this);
        this.sendCoordinatorDataToStore = this.sendCoordinatorDataToStore.bind(this);
        this.sendJobDataToStore = this.sendJobDataToStore.bind(this);
        this.sendScheduleDataToStore = this.sendScheduleDataToStore.bind(this);
    }

    // todo: don't think about refactoring the functions into variables that contain them as anonymous functions. should keep them like this because they mimic classes

    // increment the store row numbers and concat a new ScheduleFormRow to the rows state
    async onAppendRow() {

        await this.props.incrementRowNumber(this.props.numberOfRows);

        this.setState((state) => {
            return {
                rows: state.rows.concat(<ScheduleFormRow key={ this.props.numberOfRows } rowNumber={ this.props.numberOfRows }/>)
            };
        });
    }

    // decrement the store row numbers and remove the latest row from the rows state
    onRemoveRow() {
        const currentRowNumber = this.props.numberOfRows;

        if (currentRowNumber !== this.initialRow) {

            this.props.decrementRowNumber(this.props.numberOfRows);

            this.setState((existingState) => {
                return { rows: existingState.rows.slice(0, existingState.rows.length - 1) };
            });
        }
    }

    sendCoordinatorDataToStore(data) {
        this.props.updateCoordinator(data);
    }

    sendJobDataToStore(data) {
        this.props.updateJob(data);
    }

    sendScheduleDataToStore(data) {
        this.props.updateSchedule(data);
    }


    render() {
        return (
            //sendCoordinatorDataToStore, sendJobDataToStore, sendScheduleDataToStore are fired in ScheduleForm (the child component) with a parameter passed
            <ScheduleForm formRowData={ this.state.rows } appendRow={ this.onAppendRow } removeRow={ this.onRemoveRow }
                          collectCoordinatorInfo={ this.sendCoordinatorDataToStore }
                          collectJobInfo={ this.sendJobDataToStore }
                          collectScheduleInfo={ this.sendScheduleDataToStore }
                          numberOfRows = {this.props.numberOfRows} />
        );
    }
}

// ScheduleBase.propTypes = {
//     incrementRowNumber: PropTypes.func.isRequired,
//     decrementRowNumber: PropTypes.func.isRequired
// };

export default ScheduleBase;