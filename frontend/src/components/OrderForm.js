import React, { useState } from 'react';
import orderService from '../services/orderService';

function OrderForm({ stores }) {
    const [order, setOrder] = useState({
        name: '',
        store_name: '',
        coffee_type: '',
        amount: 1,
        cost: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'coffee_type') {
          const selectedCoffee = stores[order.store_name].find(coffee => coffee.coffee_type === value);
          if (selectedCoffee) {
            setOrder({ ...order, cost: selectedCoffee.cost, [name]: value });
          }
        } else {
          setOrder({ ...order, [name]: value });
        }
    };

    const handleStoreChange = (e) => {
        setOrder({ ...order, store_name: e.target.value, coffee_type: '', cost: 0 }); // Reset coffee_type and cost when store changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validation of empty inputs
        if (!order.name || !order.store_name || !order.coffee_type || !order.amount) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await orderService.placeOrder(order);
            // alert('Order created successfully!');
            console.log('Order created successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <label>Your Name:<input type="text" name="name" value={order.name} onChange={handleChange} /></label>
            <label>
                Select Store:
                <select name="store_name" value={order.store_name} onChange={handleStoreChange}>
                    <option value="">Select Store</option>
                    {Object.keys(stores).map((storeName) => (
                        <option key={storeName} value={storeName}>
                            {storeName}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Select Coffee Type:
                <select name="coffee_type" value={order.coffee_type} onChange={handleChange} disabled={!order.store_name}>
                    <option value="">Select Coffee Type</option>
                    {order.store_name && stores[order.store_name].map((coffee) => (
                        <option key={coffee.coffee_type} value={coffee.coffee_type}>
                            {coffee.coffee_type} - ${coffee.cost}/lb
                        </option>
                    ))}
                </select>
            </label>
            <label>Amount (1/2 lbs):<input type="number" name="amount" value={order.amount} onChange={handleChange} min="1" /></label>
            <button type="submit">Place Order</button>
        </form>
    );
}

export default OrderForm;