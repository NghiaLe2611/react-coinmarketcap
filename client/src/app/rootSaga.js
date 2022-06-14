import {all} from 'redux-saga/effects';
import generalSaga from '../features/general/generalSaga';

export default function* rootSaga() {
    console.log('rootSaga');
    yield all([generalSaga()]);
}