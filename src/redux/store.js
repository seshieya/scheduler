import {createStore} from 'redux';
import scheduler from './reducers/scheduler';

const store = createStore(scheduler);

export default store;