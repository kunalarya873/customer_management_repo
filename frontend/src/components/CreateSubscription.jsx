import { useState } from 'react';
import { createSubscription } from '../apiService';

const CreateSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState({
    customer: '',
    product: '',
    subscription_start_date: '',
    subscription_end_date: '',
    no_of_users_subscribed: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData({
      ...subscriptionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSubscription(subscriptionData);
      setMessage('Subscription created successfully!');
      setError(null);
    } catch (err) {
      setMessage('');
      setError('Failed to create subscription.');
    }
  };

  return (
    <div>
      <h2>Create Subscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="customer"
          value={subscriptionData.customer}
          onChange={handleChange}
          placeholder="Customer ID"
        />
        <input
          type="number"
          name="product"
          value={subscriptionData.product}
          onChange={handleChange}
          placeholder="Product ID"
        />
        <input
          type="date"
          name="subscription_start_date"
          value={subscriptionData.subscription_start_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="subscription_end_date"
          value={subscriptionData.subscription_end_date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="no_of_users_subscribed"
          value={subscriptionData.no_of_users_subscribed}
          onChange={handleChange}
          placeholder="No. of Users"
        />
        <button type="submit">Create Subscription</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateSubscription;