// import './home.css';
import React, { Component } from 'react';
import DogCard from "../DogCard/DogCard"
import {useSelector, useDispatch} from "react-redux"
import SearchDog from '../SearchDog/SearchDog';
import Filter from '../Filter/Filter';
import Order from "../Order/Order"
import * as actions from "../../redux/actions/index"

function Home() {

    const [showDogs, setShowDogs] = React.useState({
        start:0,
        list:[]
    })
    const dogsGlobalState = useSelector((state) => state.dogs)
    const dispatch = useDispatch()

    React.useEffect(async ()=> {
        const action = await actions.getAllDogs()
        if (typeof(action) === "string") {return alert(action)}
        dispatch(action)
    }, [dispatch])

    React.useEffect(()=> {
        setShowDogs((showDogs) => ({
            ...showDogs,
            list:dogsGlobalState.slice(showDogs.start, showDogs.start+8)
        }))
    },[dogsGlobalState, showDogs.start, showDogs.end])

    function changeDogs(event) {
        switch (event.target.name) {
            case "siguiente":
                if (dogsGlobalState.length>showDogs.start+8) {
                    setShowDogs(showDogs => ({
                        ...showDogs,
                        start: showDogs.start + 8,
                    
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
            list: dogsGlobalState.slice(showDogs.start, showDogs.start+9)
        }))
    }

    return <div>
        <SearchDog></SearchDog>
        <h1>Elige a tu perro</h1>
        <div>
            <Filter></Filter>
            <Order></Order>
            <br></br>
            {
                dogsGlobalState.length>8? <div>
                <button name='anterior' onClick={changeDogs}>Anterior</button>
                <button name='siguiente' onClick={changeDogs}>Siguiente</button>
                </div>:null
            }
        </div>
        <div>
            {
                showDogs.list.length? showDogs.list.map((dog, index) => <DogCard 
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    id={dog.id}
                    key={dog.id}
                />): null
            }
        </div>
        {
            dogsGlobalState.length>8? <div>
            <button name='anterior' onClick={changeDogs}>Anterior</button>
            <button name='siguiente' onClick={changeDogs}>Siguiente</button>
            </div>:null
        }
        
    </div>
}

export default Home