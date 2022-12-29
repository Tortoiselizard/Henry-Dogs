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

    async function searchDispatch() {
        const action = await getAllDogs(input.search)
        dispatch(action)
    }

    return <div>
        <input type="text" onChange={handleChange} value={input.search} placeholder="Search..." onKeyPress={(event) => {if (event.key === "Enter") searchDispatch()}}></input>
        <button onClick={searchDispatch}>Search</button>
    </div>
}

export default SearchDog