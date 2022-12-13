// import './nav.css';
import React from 'react';
import SearchDog from '../SearchDog/SearchDog.jsx';
import { NavLink , useLocation} from 'react-router-dom';

function Nav () {
const location = useLocation()
    return <div>
        <p>Barra de navegación</p>
        <NavLink to="/home"><button>Home</button></NavLink>
        <NavLink to="/dog/create"><button>New Dog</button></NavLink>
        {location.pathname === "/home"? <SearchDog/>: null}
    </div>
};

export default Nav;