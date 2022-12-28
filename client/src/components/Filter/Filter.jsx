import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {getAllTemperaments, getDogsForTemperaments, addTemperamentsFilter, getDogsForLocation} from "../../redux/actions/index"

function Filter() {

    const [temperamentsToFilter, setTemperamentsToFilter] = React.useState({
        list: []
    })
    
    const dispatch = useDispatch()
    const globalState = useSelector(state => state)

    React.useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch])

    function addTemperamentToFilter() {
        const input = document.getElementsByName("inputFilter")
        const temperament = input[0].value
        if (globalState.temperaments.includes(temperament)) {
            setTemperamentsToFilter(temperamentsToFilter => ({list: [...temperamentsToFilter.list, temperament]}))
            input["0"].value = ""
        } else {
            alert(`El temperamento ${temperament} no existe`)
        }
        
    }

    function restTemperamentToFilter(event) {
        const indexTemperament = event.target.name.slice(19)
        setTemperamentsToFilter(temperamentsToFilter => {
            let newTemperamentToFilter = [...temperamentsToFilter.list]
            newTemperamentToFilter.splice(indexTemperament,1)
            return {
                list: [...newTemperamentToFilter]
            }
        })
    }

    function filterForTemperament() {
        if (temperamentsToFilter.list.length>0) {
            const dogsToFilter = [...globalState.dogs]
            globalState.dogs.length? dispatch(getDogsForTemperaments(temperamentsToFilter.list, dogsToFilter))
            :dispatch(getDogsForTemperaments(temperamentsToFilter.list))
        }
    }

    function filterForLocation(event) {
        const location = event.target.name
        !globalState.dogs.length? dispatch(getDogsForLocation(location)): dispatch(getDogsForLocation(location, globalState.dogs))
    }

    return <div>
        <h3>Filtrar</h3>
        <label>Por temperamento: </label>
        <input type="text" placeholder="escribe el temperamento..." name="inputFilter"></input>
        <button onClick={addTemperamentToFilter}>+</button>
        <label>Por Ubicación: </label>
        <label>API </label>
        <button onClick={filterForLocation} name="API">RAZAS EXISTENTES</button>
        <label>API </label>
        <button onClick={filterForLocation} name="DB">RAZAS AGREGADAS</button>
        <button onClick={filterForTemperament}>Filtrar</button>
        <br/>
        <label>Temeramentos para filtrar: </label>
        {
            temperamentsToFilter.list.length > 0? temperamentsToFilter.list.map((temperament, index) => <div key={index}>
                <label>{temperament}</label>
                <button onClick={restTemperamentToFilter} name={`temperamentToFilter${index}`}>x</button>
                </div>)
                :null
        }
    </div>
}

export default Filter