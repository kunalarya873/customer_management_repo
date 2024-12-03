import{ useEffect, useState } from 'react';

const Revenue = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Add 'include_active=true' as a query parameter to the URL
        const response = await fetch('http://127.0.0.1:8000/api/subscriptions/revenue/?include_active=true', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Failed to fetch revenue data: ${response.statusText}`);
        }

        const data = await response.json();
        setRevenueData(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching revenue data");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []); // This will only run once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>End of Day Revenue</h2>
      <p>Total Revenue: ${revenueData.total_revenue}</p>
      <p>Include Active Subscriptions: {revenueData.adjustments.include_active ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Revenue;
