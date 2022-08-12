import axiosClient from './axiosClient';

const coinApi = {
	getGlobalMetricsStats() {
		return axiosClient.get('/api/global_metrics');
	},
	getTrending() {
		return axiosClient.get('/api/trending');
	},
	getNews() {
		return axiosClient.get('/api/news');
	},
	getCoins() {
		return axiosClient.get('/api/coin_list');
	},
};

export default coinApi;
