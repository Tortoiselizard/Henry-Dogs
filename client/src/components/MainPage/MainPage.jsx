import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {updateTemperaments, getAllTemperaments} from "../../redux/actions/index"

function MainPage() {

    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)

    React.useEffect(async () => {
        await dispatch(updateTemperaments())
        dispatch(getAllTemperaments())
    }, [dispatch])

    return <div>
        <h1>Henry Dogs</h1>        
        <Link to="/home"><button>Ir al Home</button></Link>
    </div>
}

export default MainPage