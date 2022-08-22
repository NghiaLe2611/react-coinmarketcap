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
	getCoins(page) {
		if (!page || page === 1) {
			return axiosClient.get('/api/coin_list');
		}
		return axiosClient.get(`/api/coin_list?page=${page}`);
	},
};

export default coinApi;
