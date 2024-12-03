import { useState } from 'react';

const ProductForm = () => {
  const [productData, setProductData] = useState({ name: '', description: '', price: '' });
  const [productId, setProductId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        setProductId(data.id); // Assuming response contains the new product ID
      } else {
        setError(data.message || 'Error creating product');
      }
    } catch (err) {
      setError('Error creating product');
    }
  };

  return (
    <div>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
        />
        <button type="submit">Create Product</button>
      </form>

      {productId && <p>Product created successfully! ID: {productId}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductForm;
