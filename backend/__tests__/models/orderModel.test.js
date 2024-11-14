const Order = require('../../src/models/orderModel');

describe('Order Model', () => {
    let createMock;
    let updateOrCreateMock;
    let getAllMock;
    let deleteMock;

    beforeEach(() => {
        createMock = jest.fn();
        updateOrCreateMock = jest.fn();
        getAllMock = jest.fn();
        deleteMock = jest.fn();

        Order.create = createMock;
        Order.updateOrCreate = updateOrCreateMock;
        Order.getAll = getAllMock;
        Order.delete = deleteMock;
    });


    it('should create a new order', async () => {
        const newOrderData = { user_name: 'Test User', store_name: "Test Store", coffee_type: 'Test Coffee', amount: 2, total: 600 };

        const result = await Order.create(newOrderData, (err, res) => {
          expect(err).toBeNull();
          expect(res).toEqual({insertId: 1})
  
        });
        expect(createMock).toHaveBeenCalledWith(newOrderData, expect.any(Function))


    });

    it('should update an existing order', async () => {
        const updatedOrder = { user_name: 'Test User', store_name: 'Test Store', coffee_type: 'Test Coffee', amount: 2, total: 200 };

        const result = await Order.updateOrCreate(updatedOrder, (err,res) => {
          expect(err).toBeNull();
          expect(res).toEqual({affectedRows: 1})
        });
        expect(updateOrCreateMock).toHaveBeenCalledWith(updatedOrder, expect.any(Function));


    });
});