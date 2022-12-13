import React from "react";
import { Link } from 'react-router-dom';

function MainPage() {
    return <div>
        <h1>Henry Dogs</h1>        
        <Link to="/home"><button>Ir al Home</button></Link>
    </div>
}

export default MainPage