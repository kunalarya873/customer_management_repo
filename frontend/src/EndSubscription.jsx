import { useState, useEffect } from 'react';

const EndSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
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

  const handleEnd = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/subscriptions/${selectedSubscription}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_end_date: today,
        }),
      });

      if (!response.ok) {
        throw new Error('Error ending subscription.');
      }

      alert('Subscription ended successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>End Subscription</h2>
      <form onSubmit={handleEnd}>
        <label>Select Subscription:</label>
        <select onChange={(e) => setSelectedSubscription(e.target.value)} value={selectedSubscription}>
          <option value="">Select Subscription</option>
          {subscriptions.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.customer.name} - {sub.product.product_name}
            </option>
          ))}
        </select>
        
        <button type="submit">End Subscription</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EndSubscription;
