/**
 * @fileOverview Represents all action creators
 */

import {
    INCREMENT_ROW_NUMBER,
    DECREMENT_ROW_NUMBER,
    UPDATE_COORDINATOR,
    UPDATE_JOB,
    UPDATE_SCHEDULE
} from './ActionTypes';

/**
 * increment the number of rows
 * @param {number} numberOfRows The row number
 * @returns {{type: string, numOfRows: number}} The action type and the number of rows
 */
export const incrementRowNumber = (numberOfRows) => ({
    type: INCREMENT_ROW_NUMBER,
    numOfRows: numberOfRows
});

/**
 * decrement the number of rows
 * @param {number} numberOfRows The row number
 * @returns {{type: string, numOfRows: number}} The action type and the number of rows
 */
export const decrementRowNumber = (numberOfRows) => ({
    type: DECREMENT_ROW_NUMBER,
    numOfRows: numberOfRows
});

export const updateCoordinator = (coordinatorInfo) => ({
    type: UPDATE_COORDINATOR,
    coordinatorInfo: coordinatorInfo
});

export const updateJob = (jobInfo) => ({
    type: UPDATE_JOB,
    jobInfo: jobInfo
});

export const updateSchedule = (scheduleInfo) => ({
    type: UPDATE_SCHEDULE,
    scheduleInfo: scheduleInfo
});


