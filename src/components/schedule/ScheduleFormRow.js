import React from 'react';
import {
    FormGroup,
    Input,
    Label,
    Row,
    Col
} from 'reactstrap';

function ScheduleFormRow(props) {
        return (
            <div>
                <Row form>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label htmlFor={"sc-row" + props.rowNumber + "-type"}>Type of Work:</Label>
                            <Input type="text"
                                   name={"sc-row" + props.rowNumber + "-type"}
                                   id={"sc-row" + props.rowNumber + "-type"}
                                   className="sc-rows-type"
                                   placeholder="eg. Drywall"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor={"sc-row" + props.rowNumber + "-days"}>Business Days Needed:</Label>
                            <Input type="text"
                                   name={"sc-row" + props.rowNumber + "-days"}
                                   id={"sc-row" + props.rowNumber + "-days"}
                                   className="sc-rows-days"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label htmlFor={"sc-row" + props.rowNumber + "-trade"}>Trade Name:</Label>
                            <Input type="text"
                                   name={"sc-row" + props.rowNumber + "-trade"}
                                   id={"sc-row" + props.rowNumber + "-trade"}
                                   className="sc-rows-trade"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor={"sc-row" + props.rowNumber + "-trade-email"}>Trade Email:</Label>
                            <Input type="text"
                                   name={"sc-row" + props.rowNumber + "-trade-email"}
                                   id={"sc-row" + props.rowNumber + "-trade-email"}
                                   className="sc-rows-trade-email"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>

                    <Col>
                        <FormGroup>
                            <Label htmlFor={"sc-row" + props.rowNumber + "-comments"}>Comments:</Label>
                            <Input type="textarea"
                                   name={"sc-row" + props.rowNumber + "-comments"}
                                   id={"sc-row" + props.rowNumber + "-comments"}
                                   className="sc-rows-comments"/>
                        </FormGroup>
                    </Col>
                </Row>

                <hr />
            </div>
        );
    }

    export default ScheduleFormRow;


