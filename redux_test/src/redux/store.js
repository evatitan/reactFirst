import { createStore } from 'redux';
import countReducer from './count_redux';

const store = createStore(countReducer);
export default store;
