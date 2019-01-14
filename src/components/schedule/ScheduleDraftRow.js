import React from 'react';
import { Input } from 'reactstrap';

function ScheduleDraftRow(props) {
    return (
        <tr>
            <td>
                { /*items at index 1 are the input values */ }
                { /*items at index 0 are they ids*/ }
                <Input type="textarea"
                       defaultValue={ props.typeOfWork }
                       id={ `sc-row${props.rowNumber}-type` }
                       className={ `sc-rows-${props.rowNumber}` }
                />
            </td>
            <td>
                <Input type="textarea"
                       defaultValue={ props.trade }
                       id={ `sc-row${props.rowNumber}-trade` }
                       className={ `sc-rows-${props.rowNumber}` }
                />
            </td>
            <td>
                <Input type="textarea"
                       defaultValue={ props.tradeEmail }
                       id={ `sc-row${props.rowNumber}-tradeEmail` }
                       className={ `sc-rows-${props.rowNumber}` }

                />
            </td>
            <td>
                { /*todo: need to add value*/ }
                <Input type="text"
                       defaultValue=""
                       id={ `sc-row${props.rowNumber}-dayIn`}
                       className={ `sc-rows-${props.rowNumber}` }/>
            </td>
            <td>
                { /*todo: need to add value*/ }
                <Input type="text"
                       defaultValue=""
                       id={ `sc-row${props.rowNumber}-dayOut`}
                       className={ `sc-rows-${props.rowNumber}` }/>
            </td>
            <td>
                <Input type="text"
                       defaultValue={ props.daysNeeded }
                       id={ `sc-row${props.rowNumber}-days` }
                       className={ `sc-rows-${props.rowNumber}` }
                />
            </td>
            <td>
                <Input type="textarea"
                       defaultValue={ props.comments }
                       id={ `sc-row${props.rowNumber}-comments` }
                       className={ `sc-rows-${props.rowNumber}` }
                />
            </td>
        </tr>
    );
}

export default ScheduleDraftRow;