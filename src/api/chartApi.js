import axiosClient from './axiosClient';

const chartApi = {
	getChartData(coin, interval) {
		return axiosClient.get(`/api/chart_data/${coin}?interval=${interval}`);
	},
};

export default chartApi;
