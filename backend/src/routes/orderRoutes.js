const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { Parser } = require('json2csv');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.delete('/:id', orderController.deleteOrder);
router.get('/coffee', orderController.getCoffeeInfo);
router.get('/export/bean-amounts', orderController.exportBeanAmounts);
router.get('/export/orders', orderController.exportOrders);


module.exports = router;