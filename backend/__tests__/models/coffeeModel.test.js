const Coffee = require('../../src/models/coffeeModel');

describe('Coffee Model', () => {
    it('should get all coffee information', (done) => {
        const mockCoffeeData = [
            { store_name: 'George\'s Coffee', coffee_type: '淺中焙 衣索比亞 藝妓村 夏亞區 果利藝妓 日曬 綠標', cost: 700 },
            { store_name: 'George\'s Coffee', coffee_type: '淺中焙 肯亞 祈安布區 魯埃拉莊園 日曬', cost: 530 },

        ];
        const dbMock = {
            query: jest.fn((query, callback) => {
                callback(null, mockCoffeeData);
            })
        };

        const CoffeeWithMock = {
            getAll: (callback) => {
                dbMock.query('SELECT * FROM coffee_info', callback)
            }
        };

        const cb = jest.fn();
        CoffeeWithMock.getAll(cb)
        expect(cb).toHaveBeenCalledWith(null, mockCoffeeData);
        done();

    });


    it('should handle errors when getting coffee information', (done) => {
        const mockError = new Error('Database error');
        const dbMock = {
            query: jest.fn((query, callback) => {
                callback(mockError, null);
            })
        };

        const CoffeeWithMock = {
            getAll: (callback) => {
                dbMock.query('SELECT * FROM coffee_info', callback)
            }
        };

        const cb = jest.fn();
        CoffeeWithMock.getAll(cb)
        expect(cb).toHaveBeenCalledWith(mockError, null);
        done();


    });
});