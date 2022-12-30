import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {getAllTemperaments, getDogsForTemperaments, addTemperamentsFilter, getDogsForLocation, getAllDogs, probando, keepDogs, updateTemperaments} from "../../redux/actions/index"

function Filter() {

    const [stateFilter, setStateFilter] = React.useState({
        temperamentsToFilter: [],
        temperamentsFiltered: [],
        locationToFilter:""
    })
    
    const dispatch = useDispatch()
    const globalState = useSelector(state => state)

    React.useEffect(() => {
        dispatch(updateTemperaments())
        dispatch(getAllTemperaments())
    }, [dispatch])

    function addTemperamentToFilter() {
        const input = document.getElementsByName("inputFilter")
        let temperament = input[0].value
        temperament = temperament[0].toUpperCase() + temperament.slice(1).toLowerCase()
        if (globalState.temperaments.includes(temperament)) {
            setStateFilter(stateFilter => ({
                ...stateFilter,
                temperamentsToFilter: [...stateFilter.temperamentsToFilter, temperament]
            }))
            input["0"].value = ""
        } else {
            alert(`El temperamento ${temperament} no existe`)
        }
        
    }

    function restTemperamentToFilter(event) {
        const indexTemperament = event.target.name.slice(19)
        setStateFilter(stateFilter => {
            let newTemperamentToFilter = [...stateFilter.temperamentsToFilter]
            newTemperamentToFilter.splice(indexTemperament,1)
            return {
                ...stateFilter,
                temperamentsToFilter: [...newTemperamentToFilter]
            }
        })
    }

    async function filterForTemperament(listDogs, state) {
        if (state.temperamentsToFilter.length>0) {
            const dogsToFilter = [...listDogs]
            if (dogsToFilter.length) {
                const action = await getDogsForTemperaments(state.temperamentsToFilter, dogsToFilter)
                // dispatch(action)
                setStateFilter(state => ({
                    ...state,
                    temperamentsFiltered: [...state.temperamentsToFilter]
                }))
                return action
            } 
            const action = await getDogsForTemperaments(state.temperamentsToFilter)
            // dispatch(action)
            setStateFilter(state => ({
                ...state,
                temperamentsFiltered: [...state.temperamentsToFilter]
            }))
            return action
        }
        // setStateFilter(state => ({...state}))
        // dispatch(keepDogs(listDogs))
        // console.log(listDogs)
        return {payload: listDogs}
    }

    async function filterForLocation(listDogs, state) {
        // console.log(state)
        // console.log(listDogs)
        const inputsLocation = document.getElementsByName("inputFilterLocation")
        // console.log(inputsLocation)
        let inputChecked
        inputsLocation.forEach(input => {if (input.checked) inputChecked = input})
        // console.log(inputChecked)
        if (inputChecked !== undefined) {
            const dogsToFilter = [...listDogs]
            if (dogsToFilter.length) {
                const action = await getDogsForLocation(inputChecked.value, dogsToFilter)
                // console.log(action)
                // dispatch(action)
                setStateFilter(state => ({
                    ...state,
                    locationToFilter: inputChecked.value
                }))
                return action
            } 
        }
        // setStateFilter(state => ({...state}))
        // console.log("no entre en el inputChecked y retorno todo el listDogs")
        // dispatch(keepDogs(listDogs))
        return {payload: listDogs}
    }

    async function filter(state = stateFilter, dogsGS = globalState.dogs) {
        // console.log("entre en filtrar")
        // console.log(state)
        // console.log(dogsGS)
        // const listDogs = await getAllDogs()
        // console.log(listDogs)
        // const dogsFilteredForTemperament = await filterForTemperament(globalState.dogs)
        // console.log(dogsFilteredForTemperament.payload)

        // const dogsFilteredForLocation = await filterForLocation(globalState.dogs)
        // console.log(dogsFilteredForLocation.payload)
        // let listDogsFiltered

        const arrayFilter = [filterForTemperament, filterForLocation]
        let action
        for (let i=0, acc={payload: dogsGS}; i<arrayFilter.length; i++) {
            const listDogsFiltered = await arrayFilter[i](acc.payload, state)
            acc = listDogsFiltered
            action = acc
        }
        // console.log(action)
        dispatch(keepDogs(action.payload))

        // const arrayFiltered = [filterForTemperament, filterForLocation].reduce( async (acc, cur) => {
        //     console.log(acc.payload)
        //     const action = await cur(acc.payload)
        //     console.log(action)
        //     return action
        // }, {payload: globalState.dogs})
        // console.log(arrayFiltered.payload)
    }

    async function goBack(event) {
        const actionAllDogs = await getAllDogs()
        const dogsGS = actionAllDogs.payload
        // console.log(dogsGS)
        const buttonCloseFiltered = event.target.name.slice(19)
        if (buttonCloseFiltered[0]==="T") {
            const newTemperamentsFiltered = [...stateFilter.temperamentsFiltered]
            newTemperamentsFiltered.splice(buttonCloseFiltered.slice(1),1)
            const newState = {
                ...stateFilter,
                temperamentsToFilter: newTemperamentsFiltered ,
                temperamentsFiltered: newTemperamentsFiltered
            }
            setStateFilter(state=> newState)
            filter(newState, dogsGS)
        }
        else if (buttonCloseFiltered[0]==="L") {
            // console.log("entre en L")
            const inputsLocation = document.getElementsByName("inputFilterLocation")
            inputsLocation.forEach(input => input.checked = false)
            const newState = {
                ...stateFilter,
                locationToFilter: ""
            }
            // console.log(newState)
            setStateFilter(state=> newState)
            filter(newState, dogsGS)
        }
    }

    return <div>
        <h3>Filtrar</h3>
        {
            stateFilter.temperamentsFiltered.length || stateFilter.locationToFilter?
                <p>Se esta filtrando por: </p>  
            :null
        }
        {
            stateFilter.temperamentsFiltered.length?
            <div>
                <label>Temperamentos: </label>
                {
                    stateFilter.temperamentsFiltered.map((temperament, index) => 
                    <div key={index}>
                        <label>{temperament}</label>
                        <button onClick={goBack} name={`buttonCloseFilteredT${index}`}>x</button>
                    </div>)
                }
            </div>
            :null
        }
        {
            stateFilter.locationToFilter?
            <div>
                <label>Ubicacion: </label>
                <label>{stateFilter.locationToFilter}</label>
                <button onClick={goBack} name={`buttonCloseFilteredL${stateFilter.locationToFilter}`}>x</button>
            </div>
            :null
        }
        <label>Por temperamento: </label>
        <input type="text" placeholder="escribe el temperamento..." name="inputFilter" onKeyPress={(event) => {if (event.key === "Enter") addTemperamentToFilter()}}></input>
        <button onClick={addTemperamentToFilter}>+</button>

        <label>Por Ubicación: </label>
        <input type="radio" name="inputFilterLocation" id="inputFilterForAPI" value="API"></input>
        <label for="inputFilterForAPI">API </label>

        <input type="radio" name="inputFilterLocation" id="inputFilterForDB" value="DB"></input>
        <label for="inputFilterForDB">DB </label>

        {/* <input type="radio" name="inputFilterLocation" id="inputFilterForTD" value="TD"></input>
        <label for="inputFilterForTD">TODOS </label> */}

        <button onClick={() => {filter()}}>Filtrar</button>
        <br/>
        {
            stateFilter.temperamentsToFilter.length?<label>Temeramentos para filtrar: </label>:null
        }
        {
            stateFilter.temperamentsToFilter.length > 0? stateFilter.temperamentsToFilter.map((temperament, index) => <div key={index}>
                <label>{temperament}</label>
                <button onClick={restTemperamentToFilter} name={`temperamentToFilter${index}`}>x</button>
                </div>)
                :null
        }
    </div>
}

export default Filter