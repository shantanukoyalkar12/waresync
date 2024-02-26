import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CssComp/warehouselist.css';
import { useNavigate } from 'react-router-dom';

export default function WarehouselistCustomer() {
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/warehouse/getwarehouse', {
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer'+ ' '+ `${token}`,
          },
        });
        setWarehouses(response.data);
        
      } catch (error) {
        console.error('Error fetching warehouses:', error);
        setError('Error fetching data');
      }
    };

    fetchWarehouses();
  }, []);

  const handleBook = (warehouse) => {
    console.log(warehouse)
    navigate(`/book`);
  };
  

  

  return (
    <div class="warehouse-list">
  <h2>Warehouse List</h2>
  <div class="error">{error && <div>Error: {error}</div>}</div>
  <ul>
    {warehouses.map((warehouse) => (
      <li key={warehouse.wareId}>
        <div class="details-row">
          <div class="detail-label">ID:</div>
          <div class="detail-value">{warehouse.wareId}</div>
        </div>
        <div class="details-row">
          <div class="detail-label">Name:</div>
          <div class="detail-value">{warehouse.warehouseName}</div>
        </div>
        <div class="details-row">
          <div class="detail-label">Price:</div>
          <div class="detail-value">{warehouse.price}</div>
        </div>
        <div class="details-row">
          <div class="detail-label">Capacity:</div>
          <div class="detail-value">{warehouse.capacity} KGS</div>
        </div>
        <div class="details-row">
          <div class="detail-label">Available:</div>
          <div class="detail-value">{warehouse.isAvailable ? 'false' : 'Available'}</div>
        </div>
        <div class="details-row">
          <div class="detail-label">Address:</div>
          <div class="detail-value">{warehouse.addressLine1}, {warehouse.addressLine2}, {warehouse.city}, {warehouse.postalCode}</div>
        </div>
        <div class="details-row">
          <div class="detail-label">Owner:</div>
          <div class="detail-value">{warehouse.owner ? warehouse.owner.ownerName : 'Unknown'}</div>
        </div>
        <div class="buttons-row">
          <button class="update-button" onClick={() => handleBook(warehouse.wareId)}>Book</button>
          
        </div>
      </li>
    ))}
  </ul>
</div>



  );
}
