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

const homeSlice = createSlice({
	name: 'home',
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
export const homeActions = homeSlice.actions;

// Selectors
export const _isLoading = (state) => state.home.isLoading;
export const _generalStats = (state) => state.home.generalStats;

// Reducer
const homeReducer = homeSlice.reducer;

export default homeReducer;
