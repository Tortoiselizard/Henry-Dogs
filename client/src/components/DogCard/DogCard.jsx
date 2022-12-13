//import './bandCard.css';
import React from 'react';
import * as actions from "./../../redux/actions"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DogCard = (props) => {

    return <div>
        <Link to="/dog/5"><p>DogName</p></Link>
        <img src=''></img>
        <span>Temperament</span>
        <span>Weight</span>
    </div>
};

export default DogCard;