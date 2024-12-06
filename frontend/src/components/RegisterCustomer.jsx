import { useState } from 'react';
import { registerCustomer } from '../apiService';

const RegisterCustomer = () => {
  const [customerData, setCustomerData] = useState({
    customer_id: '',
    name: '',
    pan: '',
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerCustomer(customerData);
      setMessage('Customer registered successfully!');
      setError(null);
    } catch (err) {
      setMessage('');
      setError('Failed to register customer.');
    }
  };

  return (
    <div>
      <h2>Register Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customer_id"
          value={customerData.customer_id}
          onChange={handleChange}
          placeholder="Customer ID"
        />
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          placeholder="Customer Name"
        />
        <input
          type="text"
          name="pan"
          value={customerData.pan}
          onChange={handleChange}
          placeholder="PAN"
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterCustomer;