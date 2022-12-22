import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {getAllTemperaments, getDogsForTemperaments, addTemperamentsFilter} from "../../redux/actions/index"

function Filter() {

    // const [list, setList] = React.useState([])
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    function handleChange() {
        const input = document.getElementsByName("inputFilter")
        dispatch(addTemperamentsFilter(input["0"].value))
        input["0"].value = ""
    }

    function filterDispatch() {
        if (state.temperaments.length>0) {
            dispatch(getDogsForTemperaments(state.temperaments))
        }
    }

    return <div>
        <h3>Filtrar</h3>
        <input type="text" placeholder="escribe el temperamento..." name="inputFilter"></input>
        <button onClick={handleChange}>+</button>
        <button onClick={filterDispatch}>Filtrar</button>
        <br/>
        <label>Temeramentos: </label>
        {
            state.temperaments.length > 0? state.temperaments.map((temperament, index) => <label key={index}>{temperament}<button>x</button>, </label>):null
        }
        
    </div>
}

export default Filter