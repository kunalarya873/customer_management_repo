import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Subscription Management System</h1>
      <p>
        This is a simple system to manage customers, products, and subscriptions. Use the navigation menu to get started.
      </p>
      <nav>
        <ul>
          <li>
            <Link to="/customers">Manage Customers</Link>
          </li>
          <li>
            <Link to="/products">Manage Products</Link>
          </li>
          <li>
            <Link to="/subscriptions">Manage Subscriptions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
