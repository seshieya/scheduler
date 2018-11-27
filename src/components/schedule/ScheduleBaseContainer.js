import {connect} from 'react-redux';
import ScheduleBase from './ScheduleBase';
import { incrementRowNumber, decrementRowNumber } from '../../redux/actions/SchedulerActions';


const mapStateToProps = (state) => {
    return {
        numberOfRows: state.numberOfRows
    };
};

const mapDispatchToProps = {
    incrementRowNumber,
    decrementRowNumber,
};

const ScheduleBaseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleBase);

export default ScheduleBaseContainer;
