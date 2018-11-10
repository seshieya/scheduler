import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';

const row = (
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

class Draft extends Component {
    constructor(props) {

        super(props);

        this.state = {}
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
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default Draft;