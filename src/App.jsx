App.jsx
// src/Inventory.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCost, setItemCost] = useState('');

  const addItem = () => {
    if (itemName && itemQuantity && itemCost) {
      setItems([...items, { name: itemName, quantity: parseInt(itemQuantity), cost: parseFloat(itemCost) }]);
      setItemName('');
      setItemQuantity('');
      setItemCost('');
    }
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCost = () => {
    return items.reduce((total, item) => total + (item.quantity * item.cost), 0).toFixed(2);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-receipt').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload the page to restore original content
  };

  return (
    <div className="inventory">
      <h1>Mk Computer Inventory</h1>
      <div className="add-item">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost per Item"
          value={itemCost}
          onChange={(e) => setItemCost(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Cost per Item</th>
            <th>Total Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>Rs.{item.cost.toFixed(2)}</td>
              <td>Rs.{(item.quantity * item.cost).toFixed(2)}</td>
              <td>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-quantity">
        <h2>Total Quantity: {getTotalQuantity()}</h2>
        <h2>Total Cost: Rs.{getTotalCost()}</h2>
      </div>
      <button onClick={handlePrint} className="print-button">Print Receipt</button>

      {/* Hidden printable receipt */}
      <div id="printable-receipt" className="printable-receipt">
        <h2>Mk Computer Receipt</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Cost</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs.{item.cost.toFixed(2)}</td>
                <td>Rs.{(item.quantity * item.cost).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <p>Total Quantity: {getTotalQuantity()}</p>
          <p>Total Cost: Rs.{getTotalCost()}</p>
        </div>
      </div>
    </div>
  );
};

export default App;