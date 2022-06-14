import axiosClient from "./axiosClient";

const coinApi = {
    getGlobalMetricsStats() {
        return axiosClient.get('/api/global_metrics');
    }
};

export default coinApi;