import React from "react";
import {useDispatch} from "react-redux"
import {getAllDogs} from "../../redux/actions/index"
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
        // console.log("esto es lo que retorno el action-generator", action)
        if (Array.isArray(action.payload)) {dispatch(action)}
        else {alert(action.payload)}
    }

    return <div className={style.SearchDog}>
        <input type="text" onChange={handleChange} value={input.search} placeholder="Search..." onKeyPress={(event) => {if (event.key === "Enter") searchDispatch()}} className={style.input}></input>
        <button onClick={searchDispatch} className={style.buttons}>🔍</button>
    </div>
}

export default SearchDog