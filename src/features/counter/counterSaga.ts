import {takeEvery,delay,put,call} from '@redux-saga/core/effects'
import {  PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga,incrementSagaSuccess } from './counterSlice';
import { fetchCount } from './counterAPI';

// export function* log(action: PayloadAction){
//     console.log("action: ", action);

// }
function* test(){
    yield fetchCount(2);

    yield call(fetchCount, 2);
}
function* handleIncrementSaga(action: PayloadAction<number>){
    console.log("Waiting 2s ");
    //wait 2s

    yield delay(2000)

    console.log('Waiting done, dispatch action');

    yield put(incrementSagaSuccess(action.payload))

}
export default function* counterSaga(){
    console.log('counter saga');

    yield takeEvery(incrementSaga.toString(),handleIncrementSaga);

}