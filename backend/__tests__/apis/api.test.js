const request = require('supertest');
const { app } = require('../../src/app');
const startTestServer = require('../../testServer');
const orderService = require('../../src/services/orderService');
const coffeeService = require('../../src/services/coffeeService');
const orderRoutes = require('../../src/routes/orderRoutes');

jest.mock('../../src/services/orderService');
jest.mock('../../src/services/coffeeService');

describe('API', () => {
    let server;
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        app.use('/api/orders', orderRoutes); 
        server = await startTestServer(3002);
    });

    afterAll(async () => {
        await server.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Order Routes', () => {
        it('should create a new order', async () => {
            const newOrder = { name: 'Test User', store_name: 'Test Store', coffee_type: 'Test Coffee', amount: 1, cost: 100 };
            orderService.placeOrder.mockResolvedValue({ insertId: 1 });
            const res = await request(server).post('/api/orders').send(newOrder);
            expect(res.status).toBe(201);
            expect(orderService.placeOrder).toHaveBeenCalledWith(newOrder);
        });

        it('should handle errors when creating a new order', async () => {
            const newOrder = { name: 'Test User', store_name: 'Test Store', coffee_type: 'Test Coffee', amount: 1, cost: 100 };
            const error = new Error('Failed to place order');
            orderService.placeOrder.mockRejectedValue(error);
            const res = await request(server).post('/api/orders').send(newOrder);
            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Failed to create order');
        });

        it('should get all orders', async () => {
            const mockOrders = [
                { id: 1, name: 'User 1', total: 100 },
                { id: 2, name: 'User 2', total: 200 },
            ];
            orderService.getAllOrders.mockResolvedValue(mockOrders);
            const response = await request(server).get('/api/orders');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrders);
        });

        it('should handle errors when retrieving orders', async () => {
            const error = new Error('Failed to get orders');
            orderService.getAllOrders.mockRejectedValue(error);
            const res = await request(server).get('/api/orders');
            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Failed to get orders');
        });

        it('should get coffee info', async () => {
            const mockCoffeeData = [
                { store_name: 'George\'s Coffee', coffee_type: '淺中焙 衣索比亞 藝妓村 夏亞區 果利藝妓 日曬 綠標', cost: 700 },
                { store_name: 'George\'s Coffee', coffee_type: '淺中焙 肯亞 祈安布區 魯埃拉莊園 日曬', cost: 530 },
            ];
            coffeeService.getCoffeeInfo.mockResolvedValue(mockCoffeeData);
            const response = await request(server).get('/api/orders/coffee');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCoffeeData);
        });

        it('should handle errors when retrieving coffee info', async () => {
            const error = new Error('Failed to get coffee info');
            coffeeService.getCoffeeInfo.mockRejectedValue(error);
            const res = await request(server).get('/api/orders/coffee');
            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Failed to retrieve coffee info');
        });

        it('should delete an order', async () => {
            const orderId = '1'; // Keep orderId as a string.
            orderService.deleteOrder.mockResolvedValue({ affectedRows: 1 });
            const res = await request(server).delete(`/api/orders/${orderId}`);
            expect(res.status).toBe(200);
            expect(orderService.deleteOrder).toHaveBeenCalledWith(orderId); // Assertion remains string
        });

        it('should handle errors when deleting an order', async () => {
            const orderId = '1';
            const error = new Error('Failed to delete order');
            orderService.deleteOrder.mockRejectedValue(error);
            const res = await request(server).delete(`/api/orders/${orderId}`);
            expect(res.status).toBe(500);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toBe('Failed to delete order');
        });
    });
});