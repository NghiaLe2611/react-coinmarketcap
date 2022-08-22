import {createSlice} from '@reduxjs/toolkit';

const initialGeneralStats = {
	cryptos: 0,
	exchanges: 0,
	marketCap: 0,
	vol24h: 0,
	btcDom: 0,
	ethDom: 0,
	trendingSearches: [],
	recentSearches: []
};

const generalStatsStorage = localStorage.getItem('generalStats');

const initialState = {
	isLoading: false,
	generalStats: generalStatsStorage ? JSON.parse(generalStatsStorage) : initialGeneralStats,
};

const generalSlice = createSlice({
	name: 'generalCoinStats',
	initialState,
	reducers: {
		fetchData(state) {
			// console.log('fetchData');
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
export const _isLoading = (state) => state.generalCoinStats.isLoading;
export const _generalStats = (state) => state.generalCoinStats.generalStats;

// Reducer
const generalReducer = generalSlice.reducer;

export default generalReducer;
