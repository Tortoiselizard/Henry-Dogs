import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {getAllTemperaments, getDogsForTemperaments, addTemperamentsFilter, getDogsForLocation, getAllDogs, probando, keepDogs, updateTemperaments} from "../../redux/actions/index"
import style from "./Filter.module.css"

function Filter() {

    const [stateFilter, setStateFilter] = React.useState({
        temperamentsToFilter: [],
        temperamentsFiltered: [],
        locationToFilter:""
    })
    
    const dispatch = useDispatch()
    const globalState = useSelector(state => state)

    React.useEffect(async () => {
        await dispatch(updateTemperaments())
        await dispatch(getAllTemperaments())
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
        if (state.temperamentsFiltered.length>0) {
            const dogsToFilter = [...listDogs]
            if (dogsToFilter.length) {
                const action = await getDogsForTemperaments(state.temperamentsFiltered, dogsToFilter)
                // dispatch(action)
                setStateFilter(() => ({
                    ...state,
                    temperamentsFiltered: [...state.temperamentsFiltered]
                }))
                return action
            } 
            const action = await getDogsForTemperaments(state.temperamentsFiltered)
            // dispatch(action)
            setStateFilter(() => ({
                ...state,
                temperamentsFiltered: [...state.temperamentsFiltered]
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
            setStateFilter(state => ({
                ...state,
                locationToFilter: inputChecked.value
            }))
            if (dogsToFilter.length) {
                const action = await getDogsForLocation(inputChecked.value, dogsToFilter)
                // console.log(action)
                // dispatch(action)
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
        console.log(state)
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

        setStateFilter((stateFilter) => ({
            ...stateFilter,
            temperamentsToFilter: []

        }))

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

    return <div className={style.Filter}>
        <h3 className={style.titulo}>Filtrar</h3>
        <div className={style.showFiltrado}>        
            {
                stateFilter.temperamentsFiltered.length || stateFilter.locationToFilter?
                    <p>Se esta filtrando por: </p>  
                :null
            }
            {
                stateFilter.temperamentsFiltered.length?
                <div>
                    <label>Temperamentos: </label>
                    <div className={style.divParaFiltrar}>
                        {
                            stateFilter.temperamentsFiltered.map((temperament, index) => 
                            <div key={index} className={style.filtradoTemperamentos}>
                                <label>{temperament}</label>
                                <button onClick={goBack} name={`buttonCloseFilteredT${index}`} className={style.botonCancelarFiltrado}>x</button>
                            </div>)
                        }
                    </div>
                </div>
                :null
            }
            {
                stateFilter.locationToFilter?
                <div>
                    <label>Ubicacion: </label>
                    <div className={style.filtradoTemperamentos}>
                        <label>{stateFilter.locationToFilter}</label>
                        <button className={style.botonCancelarFiltrado} onClick={goBack} name={`buttonCloseFilteredL${stateFilter.locationToFilter}`}>x</button>
                    </div>
                </div>
                :null
            }
        </div>

        <div className={style.addTemperament}>
            <label>Por temperamento: </label>
            <input className={style.inputAddTemperament} type="text" placeholder="temperamento..." name="inputFilter" onKeyPress={(event) => {if (event.key === "Enter") addTemperamentToFilter()}}></input>
            <button onClick={addTemperamentToFilter} className={style.botonAddTemperament}>+</button>
        </div>

        {
            stateFilter.temperamentsToFilter.length?<label>Temeramentos para filtrar: </label>:null
        }
        <div className={style.divParaFiltrar}>
            {   
            stateFilter.temperamentsToFilter.length > 0? stateFilter.temperamentsToFilter.map((temperament, index) => <div key={index} className={style.filtradoTemperamentos}>
                <label>{temperament}</label>
                <button className={style.botonCancelarFiltrado} onClick={restTemperamentToFilter} name={`temperamentToFilter${index}`}>x</button>
                </div>)
                :null
            }
        </div>
        <div className={style.place}>
            <label>Por Ubicación: </label>
            <div>
                <input type="radio" name="inputFilterLocation" id="inputFilterForAPI" value="API"></input>
                <label for="inputFilterForAPI">API </label>
            </div>
            <div>
                <input type="radio" name="inputFilterLocation" id="inputFilterForDB" value="DB"></input>
                <label for="inputFilterForDB">DB </label>
            </div>
        </div>

        {/* <input type="radio" name="inputFilterLocation" id="inputFilterForTD" value="TD"></input>
        <label for="inputFilterForTD">TODOS </label> */}

        <button className={style.botonFiltrar} onClick={() => {
            // console.log({...stateFilter, temperamentsFiltered: [...stateFilter.temperamentsFiltered, stateFilter.temperamentsToFilter]})
            filter({...stateFilter, temperamentsFiltered: [...stateFilter.temperamentsFiltered, ...stateFilter.temperamentsToFilter]})}}>Filtrar</button>
        <br/>
        
    </div>
}

export default Filter