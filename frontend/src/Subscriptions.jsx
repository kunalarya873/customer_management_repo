import { useState, useEffect } from 'react';
import { fetchSubscriptions, createSubscription, updateSubscription, deleteSubscription } from './api';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [newSubscription, setNewSubscription] = useState({
        customer: '',
        product: '',
        active_from: '',
        active_until: '',
    });

    useEffect(() => {
        const getSubscriptions = async () => {
            const { data } = await fetchSubscriptions();
            setSubscriptions(data);
        };
        getSubscriptions();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await createSubscription(newSubscription);
        setNewSubscription({ customer: '', product: '', active_from: '', active_until: '' });
        const { data } = await fetchSubscriptions();
        setSubscriptions(data);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateSubscription(newSubscription.id, newSubscription);
        const { data } = await fetchSubscriptions();
        setSubscriptions(data);
    };

    const handleDelete = async (id) => {
        await deleteSubscription(id);
        const { data } = await fetchSubscriptions();
        setSubscriptions(data);
    };

    return (
        <div>
            <h2>Subscriptions</h2>
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Customer"
                    value={newSubscription.customer}
                    onChange={(e) => setNewSubscription({ ...newSubscription, customer: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Product"
                    value={newSubscription.product}
                    onChange={(e) => setNewSubscription({ ...newSubscription, product: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Active From"
                    value={newSubscription.active_from}
                    onChange={(e) => setNewSubscription({ ...newSubscription, active_from: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Active Until"
                    value={newSubscription.active_until}
                    onChange={(e) => setNewSubscription({ ...newSubscription, active_until: e.target.value })}
                />
                <button type="submit">Create Subscription</button>
            </form>

            <ul>
                {subscriptions.map(sub => (
                    <li key={sub.id}>
                        {sub.customer} - {sub.product} (Active from {sub.active_from} to {sub.active_until})
                        <button onClick={() => handleDelete(sub.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subscriptions;
