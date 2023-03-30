import React from "react";
import {useDispatch} from "react-redux"
import {getAllDogs, keepDogs, updateSearchBar} from "../../redux/actions/index"
import { useLocation } from "react-router-dom";
import style from "./SearchDog.module.css"

function SearchDog() {
    const [input, setInput] = React.useState({
        search:""
    })

    const dispatch = useDispatch()

    function handleChange(event) {
        setInput((input) => ({search: event.target.value}))
    }

    async function searchDispatch() {
        const action = await getAllDogs(input.search)
        if (Array.isArray(action.payload)) {
            dispatch(keepDogs(action.payload))
            dispatch(updateSearchBar(input.search))
        }
        else {alert(action.payload)}
    }
    
    async function showAllDogs(){
        const allDogs = await getAllDogs()
        if (typeof(allDogs.payload)=== "string") {return alert(allDogs.payload)}
        else {
            await dispatch(allDogs)
            await dispatch(keepDogs(allDogs.payload))
        }
    }

    return <div className={style.SearchDog}>
        <button className={style.buttonSearchAll} onClick={showAllDogs}>All Dogs</button>
        <input type="text" onChange={handleChange} value={input.search} placeholder="Search..." onKeyPress={(event) => {if (event.key === "Enter") searchDispatch()}} className={style.input}></input>
        <button onClick={searchDispatch} className={style.buttonToSearch}>🔍</button>
    </div>
}

export default SearchDog