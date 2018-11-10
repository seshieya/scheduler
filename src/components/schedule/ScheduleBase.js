import React, { Component } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleFormRow from './ScheduleFormRow';

const initialRow = 1;

class ScheduleBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowNumber: initialRow,
            rows: [<ScheduleFormRow key={initialRow} rowNumber={initialRow} />]
        };

        this.onAppendRow = this.onAppendRow.bind(this);
        this.onRemoveRow = this.onRemoveRow.bind(this);

    }

    onAppendRow() {
        const newRowNumber = this.state.rowNumber + 1;

        this.setState({
            rowNumber: newRowNumber,
            rows: this.state.rows.concat(<ScheduleFormRow key={newRowNumber} rowNumber={newRowNumber} />)
        });
    }

    onRemoveRow() {
        const currentRowNumber = this.state.rowNumber;
        const existingRows = this.state.rows;

        if (currentRowNumber !== initialRow) {
            this.setState({
                rowNumber: currentRowNumber - 1,
                rows: existingRows.slice(0, existingRows.length - 1)
            });
        }
    }

    render() {
        return(
            <ScheduleForm formRows={this.state.rows} appendRow={this.onAppendRow} removeRow={this.onRemoveRow}/>
        );
    }
}

export default ScheduleBase;