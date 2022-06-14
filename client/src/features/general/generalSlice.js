import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	generalStats: {
		cryptos: 0,
		exchanges: 0,
		marketCap: 0,
		vol24h: 0,
		btcDom: 0,
		ethDom: 0,
	},
};

const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		fetchData(state) {
			state.isLoading = true;
		},
		fetchDataSuccess(state) {
			state.isLoading = false;
		},
		fetchDataFailed(state) {
			state.isLoading = false;
		},
        setGeneralStats(state, action) {
            state.generalStats = action.payload;
        }
	},
});

// Actions
export const generalActions = generalSlice.actions;

// Selectors
export const _isLoading = (state) => state.general.isLoading;
export const _generalStats = (state) => state.general.generalStats;

// Reducer
const generalReducer = generalSlice.reducer;

export default generalReducer;
