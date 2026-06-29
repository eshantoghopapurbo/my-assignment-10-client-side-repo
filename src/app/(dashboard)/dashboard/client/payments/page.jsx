'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // API থেকে ডেটা আনা হচ্ছে
    axios.get('http://localhost:5000/api/payment')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
      {data.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', boxShadow: '2px 2px 10px #eee' }}>
          <h3>Payment Details</h3>
          <p><strong>Price:</strong> {item.price} BDT</p>
          <p><strong>Session ID:</strong> {item.sessionId}</p>
          <p><strong>User Email:</strong> {item.userEmail}</p>
          <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentCards;