import {all, call, put, takeLatest} from 'redux-saga/effects';
import coinApi from '../../api/coinApi';
import { generalActions } from './generalSlice';

function* fetchGeneralStats() {
	const response = yield call(coinApi.getGlobalMetricsStats);
	console.log('fetchGeneralStats', response);
    const {data} = response.data ;

    // CMC
    // const generalStats = {
    //     cryptos: data.total_cryptocurrencies,
	// 	exchanges: data.active_exchanges,
	// 	marketCap: data.quote['USD'].total_market_cap,
	// 	vol24h: data.quote['USD'].total_volume_24h,
	// 	btcDom: data.btc_dominance,
	// 	ethDom: data.eth_dominance
    // }

    // Coingecko
    const generalStats = {
        cryptos: data.active_cryptocurrencies,
		exchanges: data.markets,
		marketCap: data.total_market_cap.usd,
		vol24h: data.total_volume.usd,
		btcDom: data.market_cap_percentage.btc,
		ethDom: data.market_cap_percentage.eth
    }

    yield put(
		generalActions.setGeneralStats(generalStats)
	);

    // const [maleCount, femaleCount, highMarkCount, lowMarkCount] = stats;

	// yield put(
	// 	dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
	// );
}

function* fetchGeneralData() {
	try {
		yield all([
			// run together, first come first serve
			call(fetchGeneralStats),
		]);
		yield put(generalActions.fetchDataSuccess());
	} catch (err) {
		console.log('Failed to fetch dashboard data', err);
    	yield put(generalActions.fetchDataFailed());
	}
}

export default function* generalSaga() {
	yield takeLatest(generalActions.fetchData.type, fetchGeneralData);
}
