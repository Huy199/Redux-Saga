import counterSaga from 'features/counter/counterSaga';
import {all} from 'redux-saga/effects';
function* helloSaga(){
    console.log("helloSaga: ");

}
export default function* rootSaga(){
    console.log("rootSaga: ", rootSaga);
    yield all([helloSaga(),counterSaga()])

}