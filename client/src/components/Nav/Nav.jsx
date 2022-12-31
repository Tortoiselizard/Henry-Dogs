// import './nav.css';
import React from 'react';
import SearchDog from '../SearchDog/SearchDog.jsx';
import { NavLink} from 'react-router-dom';

function Nav () {
    return <div>
        <p>Barra de navegación</p>
        <NavLink to="/home"><button>Home</button></NavLink>
        <NavLink to="/dog/create"><button>New Dog</button></NavLink>
    </div>
};

export default Nav;