// const db = require('../../config/db');
// const Order = require('../orderModel');

// jest.mock('../../config/db', () => ({
//     query: jest.fn(),
// }));

// describe('Order Model', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should create a new order', (done) => {
//         const newOrderData = { name: 'Test User', store_name: "Test Store", coffee_type: 'Test Coffee', amount: 2, total: 600 };

//         // Mock the db.query function to simulate a successful database insertion
//         db.query.mockImplementation((query, values, callback) => {
//             callback(null, { insertId: 1 }); // Simulate successful insertion with insertId 1
//         });

//         Order.create(newOrderData, (err, result) => {
//             expect(err).toBeNull();
//             expect(result.insertId).toBe(1); // Check if insertId is returned correctly
//             expect(db.query).toHaveBeenCalledWith(
//                 'INSERT INTO orders (user_name, store_name, coffee_type, amount, total) VALUES (?, ?, ?, ?, ?)',
//                 [newOrderData.name, newOrderData.store_name, newOrderData.coffee_type, newOrderData.amount, newOrderData.total],
//                 expect.any(Function) // Check if the callback is passed correctly
//             );

//             done(); // Call done() to finish the asynchronous test
//         });
//     });




//     it('should get all orders', (done) => {
//         const mockOrders = [{ id: 1, user_name: 'User 1' }, { id: 2, user_name: 'User 2' }];
//         db.query.mockImplementation((query, callback) => {
//             callback(null, mockOrders);
//         });

//         Order.getAll((err, orders) => {
//             expect(err).toBeNull();
//             expect(orders).toEqual(mockOrders);
//             done();
//         });
//     });

//     it('should delete an order', (done) => {
//         const orderIdToDelete = 5;
//         db.query.mockImplementation((query, value, callback) => {
//             callback(null, { affectedRows: 1 });
//         });

//         Order.delete(orderIdToDelete, (err, result) => {
//             expect(err).toBeNull();
//             expect(result.affectedRows).toBe(1);
//             expect(db.query).toHaveBeenCalledWith('DELETE FROM orders WHERE id = ?', [orderIdToDelete], expect.any(Function));
//             done();
//         });
//     });


//     it('should handle error when create order', (done) => {
//         const newOrderData = { name: 'Test User', store_name: "Test Store", coffee_type: 'Test Coffee', amount: 2, total: 600 };
//         const mockError = new Error('Database error');


//         db.query.mockImplementation((query, values, callback) => {

//             callback(mockError, null)
//         })

//         Order.create(newOrderData, (err, result) => {
//             expect(err).toEqual(mockError);
//             expect(result).toBeNull();

//             done();
//         });

//     })


//     it('should handle error when get all orders', (done) => {


//         const mockError = new Error('Database error');
//         db.query.mockImplementation((query, callback) => {

//             callback(mockError, null)
//         })


//         Order.getAll((err, result) => {

//             expect(err).toEqual(mockError);
//             expect(result).toBeNull();

//             done();
//         });

//     })


//     it('should handle error when delete order', (done) => {
//         const orderIdToDelete = 5;
//         const mockError = new Error('Database error');
//         db.query.mockImplementation((query, callback) => {

//             callback(mockError, null)
//         })

//         Order.delete(orderIdToDelete, (err, result) => {
//             expect(err).toEqual(mockError);
//             expect(result).toBeNull();

//             done();
//         });

//     })


// });