const orderService = require('../services/orderService');
const coffeeService = require('../services/coffeeService');
const { Parser } = require('json2csv');

async function exportBeanAmounts(req, res) {


  try {
      const beanAmounts = await orderService.getBeanAmounts();


      const fields = ['store_name', 'coffee_type', 'amount', 'total'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(beanAmounts);


      res.setHeader('Content-Type', 'text/csv');

      res.setHeader('Content-Disposition', 'attachment; filename=bean_amounts.csv');


      res.status(200).send(csv)


  } catch (error) {
      console.error('Error exporting bean amounts:', error);
      res.status(500).json({ error: 'Failed to export bean amounts' });

  }
}


async function exportOrders(req, res) {

  try {
      const orders = await orderService.getAllOrders();
      const fields = ['user_name', 'store_name', 'coffee_type', 'amount', 'total'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(orders);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=orders.csv');

      res.status(200).send(csv)




  } catch (error) {

      console.error("Error exporting orders:", error);
      res.status(500).json({ error: 'Failed to export orders' });

  }
}

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const orderData = req.body;
            await orderService.placeOrder(orderData);
            res.status(201).json({ message: 'Order placed successfully!' });
        } catch (err) {
            console.error('Error creating order:', err);
            res.status(500).json({ error: 'Failed to create order' });
        }
    },
    getOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.json(orders);
        } catch (err) {
            console.error('Error getting orders:', err);
            res.status(500).json({ error: 'Failed to get orders' });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            await orderService.deleteOrder(orderId);
            res.json({ success: true });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ success: false, error: "Failed to delete order" });
        }
    },
    getCoffeeInfo: async (req, res) => {
        try {
            const coffeeInfo = await coffeeService.getCoffeeInfo();
            res.json(coffeeInfo);
        } catch (err) {
            console.error('Error getting coffee info:', err);
            res.status(500).json({ error: 'Failed to retrieve coffee info' });
        }
    },
    exportBeanAmounts,
    exportOrders
};

module.exports = OrderController;