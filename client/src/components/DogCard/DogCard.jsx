//import './bandCard.css';
import React from 'react';
import {getDogDetail} from "./../../redux/actions"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DogCard = (props) => {

    return <div>
        <Link to={`/dog/${props.id}`}><label>{props.name}</label></Link>
        <img src={props.image} alt={props.name}></img>
        <span>{props.temperament}</span>
        <span>{props.weight}</span>
    </div>
};

export default DogCard;