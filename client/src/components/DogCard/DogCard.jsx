//import './bandCard.css';
import React from 'react';
import {getDogDetail} from "./../../redux/actions"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DogCard = (props) => {

    return <div>
        <Link to={`/dog/${props.id}`}><label>{props.name}</label></Link>
        <br></br>
        <img src={props.image} alt={props.name}></img>
        <br></br>
        <label>Temperament: </label>
        <span>{props.temperament}</span>
        <br></br>
        <label>Weight (Kg) : </label>
        <span>{props.weight}</span>
        <br></br>
    </div>
};

export default DogCard;