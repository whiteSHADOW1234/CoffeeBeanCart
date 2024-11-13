import React from 'react';
import orderService from '../services/orderService';

function OrderList({ orders, setOrders }) {
    const handleDelete = async (id) => {
        try {
            await orderService.deleteOrder(id);
            setOrders(orders.filter((order) => order.id !== id));
            alert('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error);
            // ... error handling (e.g., display an error message)
        }
    };

    return (
        <table className="order-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Store Name</th>
                    <th>Coffee Type</th>
                    <th>Amount</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.user_name}</td>
                        <td>{order.store_name}</td>
                        <td>{order.coffee_type}</td>
                        <td>{order.amount}</td>
                        <td>${order.total}</td>
                        <td>
                            <button onClick={() => handleDelete(order.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default OrderList;