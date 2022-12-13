//import './bandCard.css';
import React from 'react';
import * as actions from "./../../redux/actions"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DogCard = (props) => {

//    const dispatch = useDispatch()

//    function removeBanda(id) {
//       dispatch(actions.deleteBands(id))
//    }

//    return <div className='card'>
//       <button onClick={removeBanda(props.id)}>x</button>
//       <h3>{props.name}</h3>
//       <img src={props.image} alt={props.name}></img>
//       <p>FunctionDate: {props.functionDate}</p>
//       <Link to={`/band/${props.id}`}>{props.name}</Link>
//    </div>;
    return <div>
        <h1>DogCard</h1>
    </div>
};

export default BandCard;