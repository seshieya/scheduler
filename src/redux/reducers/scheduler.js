/**
 * @fileOverview The initial state and reducers
 */

import {
    INCREMENT_ROW_NUMBER,
    DECREMENT_ROW_NUMBER } from '../actions/ActionTypes';

/**
 * The initial state of the app
 * @type {{numberOfRows: number, coordinatorInfo: null, jobInfo: null, scheduleInfo: null}}
 */
const INITIAL_STATE = {
    numberOfRows: 1,
    coordinatorInfo: null,
    jobInfo: null,
    scheduleInfo: null
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
        default:
            return state
    }
}

export default scheduler;

