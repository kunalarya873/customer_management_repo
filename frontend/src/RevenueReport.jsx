import { useEffect, useState } from 'react';

const RevenueReport = () => {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/subscriptions/revenue/');
        const data = await response.json();
        setRevenueData(data);
      } catch (error) {
        console.error('Error fetching revenue:', error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div>
      <h3>Revenue Report</h3>
      {revenueData ? (
        <div>
          <p>Total Revenue: {revenueData.total_revenue}</p>
          {/* Render other revenue-related data here */}
        </div>
      ) : (
        <p>Loading revenue data...</p>
      )}
    </div>
  );
};

export default RevenueReport;
