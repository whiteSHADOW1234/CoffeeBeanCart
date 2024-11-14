import React, { useState, useEffect } from 'react';
import './App.css';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import orderService from './services/orderService';


function App() {
  const [orders, setOrders] = useState([]);
  const [stores, setStores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const storesResponse = await orderService.getCoffeeInfo();
        const storesData = {};
        storesResponse.data.forEach(item => {
          if (!storesData[item.store_name]) {
            storesData[item.store_name] = [];
          }
          storesData[item.store_name].push({ coffee_type: item.coffee_type, cost: item.cost });
        });
        setStores(storesData);

        const ordersResponse = await orderService.getAllOrders();
        setOrders(ordersResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);

      } finally {
        setLoading(false);

      }

    };


    fetchData();


  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {

    return <div>Error: {error.message}</div>;
  }
  const handleExportBeanAmounts = () => {
    orderService.exportBeanAmounts()
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data])); // Create a blob URL
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'bean_amounts.csv'); // Set filename
        document.body.appendChild(link);
        link.click(); // Simulate click to download
        link.remove(); // Clean up
      })
      .catch(err => console.error("Error exporting bean amounts:", err))
  }

  const handleExportOrders = () => {

    orderService.exportOrders()
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data])); // Create blob URL
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'orders.csv'); // Set the filename
        document.body.appendChild(link);
        link.click(); // Simulate click
        link.remove();
      })
      .catch(error => console.error("Failed to export orders:", error))
  };


  return (
    <div className="App">
      <header className="app-header">
        <h1>The Coffee Bean Cart</h1>
      </header>
      <OrderForm stores={stores} />
      <div>
        <button onClick={handleExportBeanAmounts}>Export Bean Amounts</button>
        <button onClick={handleExportOrders}>Export Orders</button>
      </div>
      <OrderList orders={orders} setOrders={setOrders} />
    </div>
  );
}

export default App;