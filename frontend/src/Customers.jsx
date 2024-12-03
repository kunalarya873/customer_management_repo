import { useState, useEffect } from 'react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from './api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ customer_id: '', name: '', pan: '' });
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        const getCustomers = async () => {
            const { data } = await fetchCustomers();
            setCustomers(data);
        };
        getCustomers();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await createCustomer(newCustomer);
        setNewCustomer({ customer_id: '', name: '', pan: '' });
        const { data } = await fetchCustomers(); // Refresh the list
        setCustomers(data);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateCustomer(editingCustomer.id, editingCustomer);
        setEditingCustomer(null); // Stop editing
        const { data } = await fetchCustomers(); // Refresh the list
        setCustomers(data);
    };

    const handleDelete = async (id) => {
        await deleteCustomer(id);
        const { data } = await fetchCustomers(); // Refresh the list
        setCustomers(data);
    };

    const handleEdit = (customer) => {
        setEditingCustomer({ ...customer });
    };

    return (
        <div>
            <h2>Customers</h2>
            <form onSubmit={editingCustomer ? handleUpdate : handleCreate}>
                <input
                    type="text"
                    placeholder="Customer ID"
                    value={editingCustomer ? editingCustomer.customer_id : newCustomer.customer_id}
                    onChange={(e) => (editingCustomer ? setEditingCustomer({ ...editingCustomer, customer_id: e.target.value }) : setNewCustomer({ ...newCustomer, customer_id: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={editingCustomer ? editingCustomer.name : newCustomer.name}
                    onChange={(e) => (editingCustomer ? setEditingCustomer({ ...editingCustomer, name: e.target.value }) : setNewCustomer({ ...newCustomer, name: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="PAN"
                    value={editingCustomer ? editingCustomer.pan : newCustomer.pan}
                    onChange={(e) => (editingCustomer ? setEditingCustomer({ ...editingCustomer, pan: e.target.value }) : setNewCustomer({ ...newCustomer, pan: e.target.value }))}
                />
                <button type="submit">{editingCustomer ? 'Update Customer' : 'Create Customer'}</button>
            </form>

            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.name} (ID: {customer.customer_id})
                        <button onClick={() => handleEdit(customer)}>Edit</button>
                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Customers;
