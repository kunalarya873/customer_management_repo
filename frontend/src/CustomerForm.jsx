import { useState } from 'react';

const CustomerForm = () => {
  const [customerData, setCustomerData] = useState({ name: '', email: '', address: '' });
  const [customerId, setCustomerId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      const data = await response.json();
      if (response.ok) {
        setCustomerId(data.id); // Assuming response contains the new customer ID
      } else {
        setError(data.message || 'Error creating customer');
      }
    } catch (err) {
      setError('Error creating customer');
    }
  };

  return (
    <div>
      <h3>Add Customer</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customerData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customerData.address}
          onChange={handleChange}
        />
        <button type="submit">Create Customer</button>
      </form>

      {customerId && <p>Customer created successfully! ID: {customerId}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CustomerForm;
