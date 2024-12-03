import { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ product_name: '', description: '', annual_subscription_cost_per_user: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await createProduct(newProduct);
        setNewProduct({ product_name: '', description: '', annual_subscription_cost_per_user: '' });
        const { data } = await fetchProducts();
        setProducts(data);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProduct(editingProduct.id, editingProduct);
        setEditingProduct(null); // Stop editing
        const { data } = await fetchProducts();
        setProducts(data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        const { data } = await fetchProducts();
        setProducts(data);
    };

    const handleEdit = (product) => {
        setEditingProduct({ ...product });
    };

    return (
        <div>
            <h2>Products</h2>
            <form onSubmit={editingProduct ? handleUpdate : handleCreate}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={editingProduct ? editingProduct.product_name : newProduct.product_name}
                    onChange={(e) => (editingProduct ? setEditingProduct({ ...editingProduct, product_name: e.target.value }) : setNewProduct({ ...newProduct, product_name: e.target.value }))}
                />
                <textarea
                    placeholder="Description"
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) => (editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value }))}
                />
                <input
                    type="number"
                    placeholder="Cost per User"
                    value={editingProduct ? editingProduct.annual_subscription_cost_per_user : newProduct.annual_subscription_cost_per_user}
                    onChange={(e) => (editingProduct ? setEditingProduct({ ...editingProduct, annual_subscription_cost_per_user: e.target.value }) : setNewProduct({ ...newProduct, annual_subscription_cost_per_user: e.target.value }))}
                />
                <button type="submit">{editingProduct ? 'Update Product' : 'Create Product'}</button>
            </form>

            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.product_name}
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
