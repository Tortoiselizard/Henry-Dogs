// import './home.css';
import React, { Component } from 'react';
import DogCard from "../DogCard/DogCard"

function Home() {
    return <div>
        <h1>Elige a tu perro</h1>
        <div>
            <input type="text" value="Filtrar por raza/Temperamento"></input>
            <button>Filtrar</button>
            <input type="text" value="Alfavetico/Peso"></input>
            <button>Ordenar</button>
        </div>
        <div>
            <DogCard/>
        </div>
    </div>
}

export default Home