import { useState } from 'react';

// Customer Form
const CustomerForm = () => {
    const [customerData, setCustomerData] = useState({
        customer_id: '',
        name: '',
        pan: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/customers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Customer Registered');
            } else {
                alert('Error: ' + data);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="customer_id" placeholder="Customer ID" onChange={handleInputChange} />
            <input type="text" name="name" placeholder="Customer Name" onChange={handleInputChange} />
            <input type="text" name="pan" placeholder="PAN" onChange={handleInputChange} />
            <button type="submit">Register Customer</button>
        </form>
    );
};

// Product Form
const ProductForm = () => {
    const [productData, setProductData] = useState({
        product_name: '',
        description: '',
        annual_subscription_cost_per_user: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Product Created');
            } else {
                alert('Error: ' + data);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="product_name" placeholder="Product Name" onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Product Description" onChange={handleInputChange} />
            <input type="number" name="annual_subscription_cost_per_user" placeholder="Cost per User" onChange={handleInputChange} />
            <button type="submit">Create Product</button>
        </form>
    );
};

// Subscription Form
const SubscriptionForm = () => {
    const [subscriptions, setSubscriptions] = useState({
        customer: '',
        product: '',
        subscription_start_date: '',
        subscription_end_date: '',
        no_of_users_subscribed: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubscriptions({ ...subscriptions, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/subscriptions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscriptions),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Subscription Created');
            } else {
                alert('Error: ' + data);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="customer" placeholder="Customer ID" onChange={handleInputChange} />
            <input type="number" name="product" placeholder="Product ID" onChange={handleInputChange} />
            <input type="date" name="subscription_start_date" placeholder="Start Date" onChange={handleInputChange} />
            <input type="date" name="subscription_end_date" placeholder="End Date" onChange={handleInputChange} />
            <input type="number" name="no_of_users_subscribed" placeholder="No. of Users" onChange={handleInputChange} />
            <button type="submit">Create Subscription</button>
        </form>
    );
};

// Extend Subscription Form
const ExtendSubscriptionForm = () => {
    const [endDate, setEndDate] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'subscriptionId') setSubscriptionId(value);
        if (name === 'endDate') setEndDate(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/subscriptions/${subscriptionId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subscription_end_date: endDate }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Subscription Extended');
            } else {
                alert('Error: ' + data);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="subscriptionId" placeholder="Subscription ID" onChange={handleInputChange} />
            <input type="date" name="endDate" placeholder="New End Date" onChange={handleInputChange} />
            <button type="submit">Extend Subscription</button>
        </form>
    );
};

// Delete Subscription Form
const DeleteSubscriptionForm = () => {
    const [subscriptionId, setSubscriptionId] = useState('');

    const handleInputChange = (e) => {
        setSubscriptionId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/subscriptions/${subscriptionId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert('Subscription Deleted');
            } else {
                const data = await response.json();
                alert('Error: ' + data);
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="subscriptionId" placeholder="Subscription ID" onChange={handleInputChange} />
            <button type="submit">Delete Subscription</button>
        </form>
    );
};

const SubscriptionManagement = () => {
    return (
        <div>
            <h1>Subscription Management</h1>
            <CustomerForm />
            <ProductForm />
            <SubscriptionForm />
            <ExtendSubscriptionForm />
            <DeleteSubscriptionForm />
        </div>
    );
};

export default SubscriptionManagement;
