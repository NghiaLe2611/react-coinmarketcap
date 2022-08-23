import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import coinApi from '../../api/coinApi';
import { generalActions } from './generalSlice';

function* fetchGeneralStats() {
	const response = yield call(coinApi.getGlobalMetricsStats);
	const { data } = response.data;
	console.log('fetchGeneralStats', data);

	// CMC
	// const generalStats = {
	//  cryptos: data.total_cryptocurrencies,
	// 	exchanges: data.active_exchanges,
	// 	marketCap: data.quote['USD'].total_market_cap,
	// 	vol24h: data.quote['USD'].total_volume_24h,
	// 	btcDom: data.btc_dominance,
	// 	ethDom: data.eth_dominance
	// }

	const state = yield select();
	const prevStats = state.generalCoinStats.generalStats;

	// Coingecko
	const generalStats = {
		cryptos: data.active_cryptocurrencies,
		exchanges: data.markets,
		marketCap: data.total_market_cap.usd,
		marketCapChange: data.market_cap_change_percentage_24h_usd,
		vol24h: data.total_volume.usd,
		btcDom: data.market_cap_percentage.btc,
		ethDom: data.market_cap_percentage.eth,
	};

	yield put(generalActions.setGeneralStats({ ...prevStats, ...generalStats }));
}

// https://http-api.livecoinwatch.com/coins/recently-added
// https://http-api.livecoinwatch.com/coins/movers?currency=USD&range=delta.day&volume=500000
function* fetchTrendingCoins() {
	const response = yield call(coinApi.getTrending);
	const { data } = response.data;
	console.log('fetchTrendingCoins', data.cryptoTopSearchRanks);

	const state = yield select();
	const prevStats = state.generalCoinStats.generalStats;
	const newStats = { ...prevStats, trendingSearches: data.cryptoTopSearchRanks.slice(0, 5) };

	yield put(
		generalActions.setGeneralStats(newStats) // get only first 5 coins
	);
}

function* fetchGeneralData() {
	try {
		yield all([
			// run together, first come first serve
			call(fetchGeneralStats),
            call(fetchTrendingCoins)
		]);
		yield put(generalActions.fetchDataSuccess());

		const state = yield select();
		localStorage.setItem('generalStats', JSON.stringify(state.generalCoinStats.generalStats));

	} catch (err) {
		console.log('Failed to fetch general data', err);
    	yield put(generalActions.fetchDataFailed());
	}
}

export default function* generalSaga() {
	yield takeLatest(generalActions.fetchData.type, fetchGeneralData);
}
