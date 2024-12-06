import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [revenue, setRevenue] = useState(null);

  // Form data states
  const [customerData, setCustomerData] = useState({
    customer_id: "",
    name: "",
    pan: "",
  });
  const [productData, setProductData] = useState({
    product_name: "",
    description: "",
    annual_subscription_cost_per_user: "",
  });
  const [subscriptionData, setSubscriptionData] = useState({
    customer: "",
    product: "",
    subscription_start_date: "",
    subscription_end_date: "",
    no_of_users_subscribed: "",
  });

  // Fetch data
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchSubscriptions();
    fetchRevenue();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/customers/");
    setCustomers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/products/");
    setProducts(res.data);
  };

  const fetchSubscriptions = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/subscriptions/");
    setSubscriptions(res.data);
  };

  const fetchRevenue = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/subscriptions/revenue/");
    setRevenue(res.data);
  };

  // Form handle functions
  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/customers/", customerData);
      fetchCustomers();
      setCustomerData({ customer_id: "", name: "", pan: "" }); // Reset form
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/products/", productData);
      fetchProducts();
      setProductData({
        product_name: "",
        description: "",
        annual_subscription_cost_per_user: "",
      }); // Reset form
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/subscriptions/", subscriptionData);
      fetchSubscriptions();
      setSubscriptionData({
        customer: "",
        product: "",
        subscription_start_date: "",
        subscription_end_date: "",
        no_of_users_subscribed: "",
      }); // Reset form
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center">Subscription Management</h1>

      {/* Customer Form */}
      <form onSubmit={handleCustomerSubmit} className="my-4">
        <h2 className="text-2xl">Add Customer</h2>
        <input
          type="text"
          name="customer_id"
          value={customerData.customer_id}
          onChange={(e) => handleInputChange(e, setCustomerData)}
          placeholder="Customer ID"
          required
          className="p-2 my-2 border rounded"
        />
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={(e) => handleInputChange(e, setCustomerData)}
          placeholder="Customer Name"
          required
          className="p-2 my-2 border rounded"
        />
        <input
          type="text"
          name="pan"
          value={customerData.pan}
          onChange={(e) => handleInputChange(e, setCustomerData)}
          placeholder="PAN Number"
          required
          className="p-2 my-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Add Customer
        </button>
      </form>

      {/* Product Form */}
      <form onSubmit={handleProductSubmit} className="my-4">
        <h2 className="text-2xl">Add Product</h2>
        <input
          type="text"
          name="product_name"
          value={productData.product_name}
          onChange={(e) => handleInputChange(e, setProductData)}
          placeholder="Product Name"
          required
          className="p-2 my-2 border rounded"
        />
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={(e) => handleInputChange(e, setProductData)}
          placeholder="Product Description"
          required
          className="p-2 my-2 border rounded"
        />
        <input
          type="number"
          name="annual_subscription_cost_per_user"
          value={productData.annual_subscription_cost_per_user}
          onChange={(e) => handleInputChange(e, setProductData)}
          placeholder="Annual Subscription Cost"
          required
          className="p-2 my-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Add Product
        </button>
      </form>

      {/* Subscription Form */}
      <form onSubmit={handleSubscriptionSubmit} className="my-4">
        <h2 className="text-2xl">Add Subscription</h2>
        <select
          name="customer"
          value={subscriptionData.customer}
          onChange={(e) => handleInputChange(e, setSubscriptionData)}
          required
          className="p-2 my-2 border rounded"
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <select
          name="product"
          value={subscriptionData.product}
          onChange={(e) => handleInputChange(e, setSubscriptionData)}
          required
          className="p-2 my-2 border rounded"
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.product_name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="subscription_start_date"
          value={subscriptionData.subscription_start_date}
          onChange={(e) => handleInputChange(e, setSubscriptionData)}
          required
          className="p-2 my-2 border rounded"
        />
        <input
          type="date"
          name="subscription_end_date"
          value={subscriptionData.subscription_end_date}
          onChange={(e) => handleInputChange(e, setSubscriptionData)}
          required
          className="p-2 my-2 border rounded"
        />
        <input
          type="number"
          name="no_of_users_subscribed"
          value={subscriptionData.no_of_users_subscribed}
          onChange={(e) => handleInputChange(e, setSubscriptionData)}
          required
          className="p-2 my-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Add Subscription
        </button>
      </form>

      {/* Subscriptions Table */}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">No. of Users</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td className="border px-4 py-2">
                {customers.find((c) => c.id === subscription.customer)?.name}
              </td>
              <td className="border px-4 py-2">
                {products.find((p) => p.id === subscription.product)?.product_name}
              </td>
              <td className="border px-4 py-2">{subscription.subscription_start_date}</td>
              <td className="border px-4 py-2">{subscription.subscription_end_date}</td>
              <td className="border px-4 py-2">{subscription.no_of_users_subscribed}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Revenue */}
      <div className="mt-4">
        <h2 className="text-2xl">Total Revenue</h2>
        <p className="text-xl">₹ {revenue?.total_revenue}</p>
      </div>
    </div>
  );
};

export default App;
