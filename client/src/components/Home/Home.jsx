// import './home.css';
import React, { Component } from 'react';
import DogCard from "../DogCard/DogCard"
import {useSelector} from "react-redux"
import Filter from '../Filter/Filter';
import Order from "../Order/Order"

function Home() {
    const dogs = useSelector((state) => state.dogs)
    const [showDogs, setShowDogs] = React.useState({
        start:0,
        end:8,
        list:[]
    })

    React.useEffect(()=> {
        console.log("entre: ", showDogs)
        setShowDogs((showDogs) => ({
            ...showDogs,
            list:dogs.slice(showDogs.start, showDogs.end)
        }))
        // console.log("en useEffect: " ,setShowDogs.list.length)
    },[dogs, showDogs.start])

    function changeDogs(event) {
        switch (event.target.name) {
            case "siguiente":
                if (dogs.length>showDogs.start+8) {
                    setShowDogs(showDogs => ({
                        ...showDogs,
                        start: showDogs.start + 8,
                        end: showDogs.end + 8
                    }))
                }
                // console.log("Siguiente: ", showDogs.list.length)
                break
            case "anterior":
                if (showDogs.start - 8 >= 0) {
                    setShowDogs(showDogs => ({
                        ...showDogs,
                        start: showDogs.start - 8,
                        end: showDogs.end - 8
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
            <Filter></Filter>
            <Order></Order>
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
                    key={dog.id}
                />)
            }
        </div>
        <div>
            <button name='anterior' onClick={changeDogs}>Anterior</button>
            <button name='siguiente' onClick={changeDogs}>Siguiente</button>
        </div>
    </div>
}

export default Home