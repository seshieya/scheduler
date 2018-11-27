import React, { Component } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleFormRow from './ScheduleFormRow';
import PropTypes from 'prop-types';


class ScheduleBase extends Component {
    constructor(props) {
        super(props);

        this.initialRow = 1;

        this.state = {
            rows: [<ScheduleFormRow key={this.initialRow} rowNumber={this.initialRow} />]
        };

        this.onAppendRow = this.onAppendRow.bind(this);
        this.onRemoveRow = this.onRemoveRow.bind(this);

    }

    // increment the store row numbers and concat a new ScheduleFormRow to the rows state
    async onAppendRow() {

        await this.props.incrementRowNumber(this.props.numberOfRows);

        this.setState((state) => {
            return { rows: state.rows.concat(<ScheduleFormRow key={this.props.numberOfRows} rowNumber={this.props.numberOfRows}/>) };
        });
    }

    // decrement the store row numbers and removee the latest row from the rows state
    onRemoveRow() {
        const currentRowNumber = this.props.numberOfRows;
        const existingRows = this.state.rows;

        if (currentRowNumber !== this.initialRow) {

            this.props.decrementRowNumber(this.props.numberOfRows);

            this.setState((state) => {
                return { rows: existingRows.slice(0, existingRows.length - 1) };
            });
        }
    }

    render() {
        return(
            <ScheduleForm formRows={this.state.rows} appendRow={this.onAppendRow} removeRow={this.onRemoveRow}/>
        );
    }
}

// ScheduleBase.propTypes = {
//     incrementRowNumber: PropTypes.func.isRequired,
//     decrementRowNumber: PropTypes.func.isRequired
// };

export default ScheduleBase;