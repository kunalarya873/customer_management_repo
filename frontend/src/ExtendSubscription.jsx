import { useState, useEffect } from 'react';

const ExtendSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch subscriptions
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/subscriptions/');
        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        setError('Failed to fetch subscriptions.');
      }
    };
    fetchSubscriptions();
  }, []);

  const handleExtend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/subscriptions/${selectedSubscription}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_end_date: newEndDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Error extending subscription.');
      }

      alert('Subscription extended successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Extend Subscription</h2>
      <form onSubmit={handleExtend}>
        <label>Select Subscription:</label>
        <select onChange={(e) => setSelectedSubscription(e.target.value)} value={selectedSubscription}>
          <option value="">Select Subscription</option>
          {subscriptions.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.customer.name} - {sub.product.product_name}
            </option>
          ))}
        </select>
        
        <label>New End Date:</label>
        <input type="date" onChange={(e) => setNewEndDate(e.target.value)} value={newEndDate} />
        
        <button type="submit">Extend Subscription</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ExtendSubscription;
