import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListResponse, Student } from "models";
import { call, takeLatest, put } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload)
        yield put(studentActions.fetchStudentListSuccess(response))
    } catch (err) {
        console.log('Failed to fetch', err);
        yield put(studentActions.fetchStudentListFailed())

    }
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList)
}