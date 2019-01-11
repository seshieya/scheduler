/**
 * @fileOverview The initial state and reducers
 */

import {
    INCREMENT_ROW_NUMBER,
    DECREMENT_ROW_NUMBER,
    UPDATE_COORDINATOR,
    UPDATE_JOB,
    UPDATE_SCHEDULE,
    UPDATE_NUMBER_OF_ROWS
} from '../actions/ActionTypes';

/**
 * The initial state of the app
 * @type {{numberOfRows: number, coordinatorInfo: null, jobInfo: null, scheduleInfo: null}}
 */
const INITIAL_STATE = {
    numberOfRows: 1,
    coordinatorInfo: {},
    jobInfo: {},
    scheduleInfo: {
        rowData: [],
        startDate: ""
    }
};


/**
 * The reducer functions for the action creators created in SchedulerActions.js
 * @param state The initial state of the app
 * @param action The action to handle
 * @returns {*} The new or default state
 */
function scheduler(state = INITIAL_STATE, action) {
    switch(action.type) {
        case INCREMENT_ROW_NUMBER:
            return Object.assign({}, state, { numberOfRows: action.numOfRows + 1 });
        case DECREMENT_ROW_NUMBER:
            return Object.assign({}, state, { numberOfRows: action.numOfRows - 1 });
        case UPDATE_NUMBER_OF_ROWS:
            return Object.assign({}, state, { numberOfRows: state.scheduleInfo.rowData.length });
        case UPDATE_COORDINATOR:
            return Object.assign({}, state, { coordinatorInfo: action.coordinatorInfo });
        case UPDATE_JOB:
            return Object.assign({}, state, { jobInfo: action.jobInfo });
        case UPDATE_SCHEDULE:
            return Object.assign({}, state, { scheduleInfo: action.scheduleInfo });
        default:
            return state;
    }
}

export default scheduler;

