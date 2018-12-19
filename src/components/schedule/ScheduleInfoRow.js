import React from 'react';
import { Input } from 'reactstrap';

function ScheduleInfoRow(props) {
    return (
        <tr>
            <td>
                <Input type="text"
                       defaultValue={ props.typeOfWork }/>
            </td>
            <td>
                <Input type="text"
                       defaultValue={ props.trade }/>
            </td>
            <td>
                <Input type="text"
                       defaultValue={ props.tradeEmail }/>
            </td>
            <td>
                { /*todo: need to add value*/ }
                <Input type="text"
                       defaultValue=""/>
            </td>
            <td>
                { /*todo: need to add value*/ }
                <Input type="text"
                       defaultValue=""/>
            </td>
            <td>
                <Input type="text"
                       defaultValue={ props.daysNeeded }/>
            </td>
            <td>
                <Input type="textarea"
                       defaultValue={ props.comments }/>
            </td>
        </tr>
    );
}

export default ScheduleInfoRow;