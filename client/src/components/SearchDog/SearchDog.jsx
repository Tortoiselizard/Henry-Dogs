import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {getAllDogs, keepDogs, updateSearchBar, updateFilters, updateOrder} from "../../redux/actions/index"
import { useLocation } from "react-router-dom";
import style from "./SearchDog.module.css"

function SearchDog() {
    const [input, setInput] = React.useState({
        search:""
    })

    const totalDogs = useSelector(state => state.totaDogs)
    const dispatch = useDispatch()

    function handleChange(event) {
        setInput((input) => ({search: event.target.value}))
    }

    async function searchDispatch() {
        const action = await getAllDogs(input.search)
        if (Array.isArray(action.payload)) {
            dispatch(keepDogs(action.payload))
            dispatch(updateSearchBar(input.search))
            await dispatch(updateFilters({
                temperamentsToFilter: [],
                temperamentsFiltered: [],
                locationToFilter:""
            }))
            await dispatch(updateOrder({
                type: "",
                sense: "",
            }))
        }
        else {alert(action.payload)}
        setInput({search:""})
    }
    
    async function showAllDogs(){
        if (totalDogs.length) {
            await dispatch(keepDogs(totalDogs))
            await dispatch(updateSearchBar(""))
            await dispatch(updateFilters({
                temperamentsToFilter: [],
                temperamentsFiltered: [],
                locationToFilter:""
            }))
            await dispatch(updateOrder({
                type: "",
                sense: "",
            }))
        } else {
            const allDogs = await getAllDogs()
            if (typeof(allDogs.payload)=== "string") {return alert(allDogs.payload)}
            else {
                await dispatch(allDogs)
                await dispatch(keepDogs(allDogs.payload))
        }
        }
    }

    return <div className={style.SearchDog}>
        <button className={style.buttonSearchAll} onClick={showAllDogs}>All Dogs</button>
        <input type="text" onChange={handleChange} value={input.search} placeholder="Search..." onKeyPress={(event) => {if (event.key === "Enter") searchDispatch()}} className={style.input}></input>
        <button onClick={searchDispatch} className={style.buttonToSearch}>🔍</button>
    </div>
}

export default SearchDog