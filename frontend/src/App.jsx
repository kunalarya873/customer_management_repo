import CustomerForm from './CustomerForm';
import ProductForm from './ProductForm';
import SubscriptionManagement from './SubscriptionManagement';
import RevenueReport from './RevenueReport';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('subscriptions');

  return (
    <div className="app-container">
      <h1>Subscription Management System</h1>
      
      <div className="tabs">
        <button onClick={() => setActiveTab('subscriptions')}>Manage Subscriptions</button>
        <button onClick={() => setActiveTab('customers')}>Add Customer</button>
        <button onClick={() => setActiveTab('products')}>Add Product</button>
        <button onClick={() => setActiveTab('revenue')}>Revenue Report</button>
      </div>

      <div className="tab-content">
        {activeTab === 'subscriptions' && <SubscriptionManagement />}
        {activeTab === 'customers' && <CustomerForm />}
        {activeTab === 'products' && <ProductForm />}
        {activeTab === 'revenue' && <RevenueReport />}
      </div>
    </div>
  );
};

export default App;
