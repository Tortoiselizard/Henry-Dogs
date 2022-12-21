import React from "react";
import {useDispatch} from "react-redux"
import {getAllDogs} from "../../redux/actions/index"

function SearchDog() {
    const [input, setInput] = React.useState({
        search:""
    })

    const dispatch = useDispatch()

    function handleChange(event) {
        setInput((input) => ({search: event.target.value}))
    }

    function searchDispatch() {
        dispatch(getAllDogs(input.search))
    }

    return <div>
        <input type="text" onChange={handleChange} value={input.search} placeholder="Search..."></input>
        <button onClick={searchDispatch}>Search</button>
    </div>
}

export default SearchDog