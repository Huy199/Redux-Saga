import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListResponse } from "models";

export interface CityState {
    loading: boolean;
    list: City[]
}
const initialState: CityState = {
    loading: false,
    list: [],

}
const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.list = action.payload.data;

        },
        fetchCityListFailed(state) {
            state.loading = false;

        },
    }
})

//Action
export const cityActions = citySlice.actions;
//Selector
export const selectCityList = (state: RootState) => state.city.list;
// **
export const selectCityMap = createSelector(selectCityList, (cityList) => {
    return cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city;
        return map;
    }, {})
}
)
//Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;