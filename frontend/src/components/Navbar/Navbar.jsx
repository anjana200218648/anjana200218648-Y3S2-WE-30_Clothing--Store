import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("Home")

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logot = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <li onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</li>
                <li onClick={() => setMenu("Store Locator")} className={menu === "Store Locator" ? "active" : ""}>Store Locator</li>
                <li onClick={() => setMenu("About Us")} className={menu === "About Us" ? "active" : ""}>About Us</li>
                <li onClick={() => setMenu("What's New")} className={menu === "What's New" ? "active" : ""}>What's New</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? " " : "dot"}></div>
                </div>

                {!token? <button onClick={() => setShowLogin(true)}>sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
                            <hr/>
                            <li onClick={logot}><img src={assets.logout_icon} alt=""/><p>Logout</p></li>

                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar