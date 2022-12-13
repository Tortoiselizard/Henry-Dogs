import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from "./../../redux/actions/index"

const CreateDog = () => {
    return <div>
        <h1>Voy a crear un perro con CreateDog</h1>
        <input type="text" value="nombre"></input>
        <input type="text" value="height"></input>
        <input type="text" value="weight"></input>
        <input type="text" value="years"></input>
        <input type="text" value="temperaments"></input>
        <button>Crear new Dog</button>
    </div>
};

export default CreateDog;