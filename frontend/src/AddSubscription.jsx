import { useState, useEffect } from 'react';

const AddSubscription = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer: '', // Now customer is a text input
    product: '',
    startDate: '',
    endDate: '',
    noOfUsers: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch products on mount
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/products/');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Log the full response to inspect the error
      const data = await response.json();
      console.log("Response Data: ", data);
  
      if (response.ok) {
        setSuccessMessage('Subscription added successfully!');
        setFormData({
          customer: '',
          product: '',
          startDate: '',
          endDate: '',
          noOfUsers: '',
        });
      } else {
        // Log the error response for debugging
        console.error('Error Response:', data);
        setError(data.detail || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error("Fetch Error: ", err);
      setError('Error adding subscription. Please try again.');
    }
  };  
  return (
    <div className="subscription-form">
      <h2>Add Product Subscription</h2>

      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="customer">Customer Name</label>
        <input
          type="text"
          id="customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          placeholder="Enter customer name or ID"
          required
        />

        <label htmlFor="product">Select Product</label>
        <select
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.product_name}
            </option>
          ))}
        </select>

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="noOfUsers">Number of Users</label>
        <input
          type="number"
          id="noOfUsers"
          name="noOfUsers"
          value={formData.noOfUsers}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Subscription</button>
      </form>
    </div>
  );
};

export default AddSubscription;
