// const request = require('supertest');
// const { app } = require('../../app'); // Your Express app
// const db = require('../../config/db');
// const { setupTestDB, teardownTestDB } = require('../../testDB/dbSetup'); //Import db setup and teardown

// let server;



// jest.mock('../../config/db', () => ({
//     query: jest.fn(),
//     end: jest.fn() //Mock db.end function.
// }));

// beforeAll(async () => {

//     process.env.NODE_ENV = 'test'; // Set the environment to "test"

//     await setupTestDB(); //Set up the test database
//     server = app.listen(3002); // Use a different port for testing


// });

// afterAll(async () => {

//     server.close();
//     await teardownTestDB();


// });



// describe('Order Routes', () => {
//     describe("GET /coffee", () => {
//         it("should retrieve all coffee information", async () => {
//             const mockCoffeeData = [
//                 { store_name: "Store A", coffee_type: "Type A", cost: 10 },
//                 { store_name: "Store B", coffee_type: "Type B", cost: 12 }
//             ];

//             db.query.mockImplementation((query, callback) => {
//                 if (query.includes('SELECT * FROM coffee_info')) {
//                     callback(null, mockCoffeeData);
//                 } else {
//                     callback(new Error('Unexpected query'));
//                 }
//             });

//             const response = await request(app).get('/api/orders/coffee');
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(mockCoffeeData);
//         });
//     });

//     describe("POST /", () => {
//         it("should create a new order", async () => {
//             const newOrder = {
//                 user_name: "Test User",
//                 store_name: "Test Store",
//                 coffee_type: "Test Coffee",
//                 amount: 2,
//                 total: 10,
//             };

//             db.query.mockImplementation((query, values, callback) => {
//                 callback(null, { insertId: 123 });
//             });

//             const response = await request(app).post('/api/orders').send(newOrder);
//             expect(response.status).toBe(201);
//             expect(response.body.message).toBe("Order placed successfully!");
//         });
//     });

//     describe("GET /", () => {
//         it("should retrieve all orders", async () => {
//             const mockOrders = [
//                 { user_name: "Test User", store_name: "Test Store", coffee_type: "Test Coffee", amount: 2, total: 10,},
//                 { user_name: "Test User1", store_name: "Test Store1", coffee_type: "Test Coffee1", amount: 2, total: 20,}
//             ];

//             db.query.mockImplementation((query, callback) => {
//                 callback(null, mockOrders);
//             });

//             const response = await request(app).get("/api/orders");
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(mockOrders);
//         });
//     });

//     describe("DELETE /:id", () => {
//         it("should delete an order", async () => {
//             const orderIdToDelete = 12;

//             db.query.mockImplementation((query, values, callback) => {
//                 callback(null, { affectedRows: 1 });
//             });

//             const response = await request(app).delete(`/api/orders/${orderIdToDelete}`);
//             expect(response.status).toBe(200);
//             expect(response.body.success).toBe(true);
//         });
//     });
// });