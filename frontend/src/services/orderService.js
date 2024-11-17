import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const orderService = {
    placeOrder: (orderData) => axios.post(API_BASE_URL, orderData),
    getAllOrders: () => axios.get(API_BASE_URL),
    deleteOrder: (orderId) => axios.delete(`${API_BASE_URL}/${orderId}`),
    getCoffeeInfo: () => axios.get(`${API_BASE_URL}/coffee`),
    exportBeanAmounts: () => axios.get(`${API_BASE_URL}/export/bean-amounts`, { responseType: 'blob' }),  //responseType blob to handle binary data
    exportOrders: () => axios.get(`${API_BASE_URL}/export/orders`, { responseType: 'blob' }) //responseType blob to handle binary data
};

export default orderService;