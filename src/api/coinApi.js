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

    getGainersLosers() {
		return axiosClient.get('/api/top_gainers_losers');
	},

	getCoins(limit, page) {
        const params = new URLSearchParams(`limit=${limit}&page=${page}`)
		if (!page || page === 1) {
            params.delete('page');
			// return axiosClient.get('/api/coin_list');
		}
        if (!limit) {
            params.delete('limit');
		}
        
		// return axiosClient.get(`/api/coin_list?page=${page}`);
        console.log(`api/coin_list?${params}`);
        return axiosClient.get(`api/coin_list?${params}`);
	},

	getDetail(id) {
		return axiosClient.get(`/api/coins/${id}`);
	},

	getTickers(id) {
		return axiosClient.get(`/api/coins/market/${id}`);
	},

    getCategories() {
		return axiosClient.get('/api/categories');
	},
	
	getCoinsByCategory(categoryId) {
		return axiosClient.get(`/api/category?id=${categoryId}`);
	},

	searchByQuery(query) {
		return axiosClient.get(`/api/search?query=${query}`);
	},
};

export default coinApi;
