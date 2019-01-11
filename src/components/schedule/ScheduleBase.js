import React, { Component } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleFormRow from './ScheduleFormRow';
import PropTypes from 'prop-types';


class ScheduleBase extends Component {
    constructor(props) {
        super(props);

        this.initialRow = 1;

        this.state = {
            rowNumber: this.initialRow,
            rows: [<ScheduleFormRow key={ this.initialRow } rowNumber={ this.initialRow }/>]
        };

        this.onAppendRow = this.onAppendRow.bind(this);
        this.onRemoveRow = this.onRemoveRow.bind(this);
    }

    // todo: don't think about refactoring the functions into variables that contain them as anonymous functions. should keep them like this because they mimic classes

    // increment the store row numbers and concat a new ScheduleFormRow to the rows state
    async onAppendRow() {

        //await this.props.incrementRowNumber(this.props.numberOfRows);

        this.setState(state => {
            return {
                rowNumber: state.rowNumber + 1
            }
        });

        this.setState((state) => {
            return {
                rows: state.rows.concat(<ScheduleFormRow key={ state.rowNumber }
                                                         rowNumber={ state.rowNumber }/>)
            };
        });
    }

    // decrement the store row numbers and remove the latest row from the rows state
    onRemoveRow() {
        if (this.state.rowNumber !== this.initialRow) {

            //this.props.decrementRowNumber(this.props.numberOfRows);

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
            //sendCoordinatorDataToStore, sendJobDataToStore, sendScheduleDataToStore are fired in ScheduleForm (the child component) with a parameter passed
            <ScheduleForm formRowData={ this.state.rows } appendRow={ this.onAppendRow } removeRow={ this.onRemoveRow }
                          collectCoordinatorInfo={ this.props.updateCoordinator }
                          collectJobInfo={ this.props.updateJob }
                          collectScheduleInfo={ this.props.updateSchedule }
                          updateNumberOfRowsInStore={ this.props.updateNumberOfRows }
                          numberOfRows={ this.state.rowNumber }/>
        );
    }
}

// ScheduleBase.propTypes = {
//     incrementRowNumber: PropTypes.func.isRequired,
//     decrementRowNumber: PropTypes.func.isRequired
// };

export default ScheduleBase;