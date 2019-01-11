import {connect} from 'react-redux';
import ScheduleBase from './ScheduleBase';
import {
    incrementRowNumber,
    decrementRowNumber,
    updateCoordinator,
    updateJob,
    updateSchedule,
    updateNumberOfRows
} from '../../redux/actions/SchedulerActions';

const mapStateToProps = (state) => {
    return {
        numberOfRows: state.numberOfRows,
        scheduleInfo: state.scheduleInfo,
        jobInfo: state.jobInfo,
        coordinatorInfo: state.coordinatorInfo,
    };
};

// todo: find out if there is a way not to repeat the importing and mapping of these constants
const mapDispatchToProps = {
    //todo: remove incrementRowNumber and DecrementRowNumber
    // incrementRowNumber,
    // decrementRowNumber,
    updateCoordinator,
    updateJob,
    updateSchedule,
    updateNumberOfRows
};

const ScheduleBaseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleBase);

export default ScheduleBaseContainer;
