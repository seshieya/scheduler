import {
    updateJob,
    updateCoordinator,
    updateSchedule,
    updateNumberOfRows
} from '../../redux/actions/SchedulerActions';
import { connect } from 'react-redux';
import Draft from './Draft';

const mapStateToProps = (state) => {
    return {
        coordinatorInfo: state.coordinatorInfo,
        jobInfo: state.jobInfo,
        scheduleDraftRows: state.scheduleInfo['rowData'],
        scheduleStartDate: state.scheduleInfo['startDate']
    };
};

const mapDispatchToProps = {
    updateJob,
    updateCoordinator,
    updateSchedule,
    updateNumberOfRows
};

const DraftContainer = connect(mapStateToProps, mapDispatchToProps)(Draft);

export default DraftContainer;