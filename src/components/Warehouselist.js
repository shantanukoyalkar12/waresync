import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CssComp/warehouselist.css';
import { useNavigate } from 'react-router-dom';

export default function WarehouseList() {
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

  const handleUpdate = (warehouse) => {
    console.log(warehouse)
    navigate(`/update/${warehouse}`);
  };
  

  const handleDelete = async (wareId) => {
    console.log(warehouses.wareId)
    try {
      if (!wareId) {
        console.error('Warehouse ID is undefined');
        return;
      }
      
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await axios.delete(`http://localhost:8080/warehouse/delete/${wareId}`, {
        headers: {
          'Authorization': 'Bearer'+ ' '+`${token}`
        },
      });
      console.log('Warehouse deleted successfully:', response.data);
      navigate('/')
      // Remove the deleted warehouse from the state
      setWarehouses(warehouses.filter(warehouse => warehouse.id !== wareId));
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      setError('Error deleting warehouse');
    }
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
          <button class="update-button" onClick={() => handleUpdate(warehouse.wareId)}>Update</button>
          <button class="delete-button" onClick={() => handleDelete(warehouse.wareId)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
</div>



  );
}
