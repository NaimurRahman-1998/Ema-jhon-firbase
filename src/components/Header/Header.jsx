import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Header = () => {
    const { LogOut, user } = useContext(AuthContext)
    const handleSignOut = () => {
        LogOut()
            .then(result => {})
            .catch(error => { console.log(error) })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
                {
                    user &&
                    <span style={{ color: "red"}}>
                        {user.email}
                        <button onClick={handleSignOut}> logOut </button>
                    </span>
                }
            </div>
        </nav>
    );
};

export default Header;