import React, { useState } from 'react';
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import fridge from '../styles/assets/fridge.svg'

const Header = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (
        <div className="header">
            <div className={hamburgerOpen ? "hamburger hamburger-open" : "hamburger"} onClick={() => setHamburgerOpen(prevState => !prevState)}>
                <hr /><hr /><hr />
            </div>
            <div className={hamburgerOpen ? "hamburger-menu hamburger-menu-open" : "hamburger-menu"}>
                <Link to="/ingredients"><h3>My Fridge</h3></Link>
                <hr />
                <Link to="/recipes"><h3>Recipes</h3></Link>
                <hr />
                <Link to="/recipes/favorite"><h3>Favorite Recipes</h3></Link>
                <hr />
                <Link to="/account"><h3>Account</h3></Link>
            </div>
            <div className="header-menu">
                <img src={fridge} alt="fridge" />
                <Link to="/ingredients"><h3>My Fridge</h3></Link>
                <Link to="/recipes"><h3>Find Recipes</h3></Link>
                <Link to="/recipe/favorites"><h3>Favorite Recipes</h3></Link>
                <Link to="/account"><h3>Account</h3></Link>
            </div>
        </div>
    )
}

export default Header;