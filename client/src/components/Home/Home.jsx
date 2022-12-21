// import './home.css';
import React, { Component } from 'react';
import DogCard from "../DogCard/DogCard"
import {useSelector} from "react-redux"

function Home() {
    const dogs = useSelector((state) => state.dogs)
    const [showDogs, setShowDogs] = React.useState({
        start:0,
        list:[]
    })

    React.useEffect(()=> {
        setShowDogs((showDogs) => ({
            ...showDogs,
            list:dogs.slice(showDogs.start, showDogs.start+8)
        }))
    },[dogs])

    function changeDogs(event) {
        switch (event.target.name) {
            case "siguiente":
                if (dogs.length>showDogs.start+8) {
                    setShowDogs(showDogs => ({
                        ...showDogs,
                        start: showDogs.start + 8
                    }))
                }
                break
            case "anterior":
                if (showDogs.start - 8 >= 0) {
                    setShowDogs(showDogs => ({
                        ...showDogs,
                        start: showDogs.start - 8,
                    }))
                }
                break
        }
        setShowDogs(showDogs => ({
            ...showDogs,
            list: dogs.slice(showDogs.start, showDogs.start+9)
        }))
    }

    return <div>
        <h1>Elige a tu perro</h1>
        <div>
            <input type="text" value="Filtrar por raza/Temperamento"></input>
            <button>Filtrar</button>
            <input type="text" value="Alfavetico/Peso"></input>
            <button>Ordenar</button>
            <button name='anterior' onClick={changeDogs}>Anterior</button>
            <button name='siguiente' onClick={changeDogs}>Siguiente</button>
        </div>
        <div>
            {
                showDogs.list.length && showDogs.list.map((dog, index) => <DogCard 
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperament}
                    weight={dog.weight.imperial}
                    id={dog.id}
                />)
            }
        </div>
    </div>
}

export default Home