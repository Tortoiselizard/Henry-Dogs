import React from "react";
import { Link } from 'react-router-dom';
import {updateTemperaments, getAllTemperaments} from "../../redux/actions/index"
import {useDispatch} from "react-redux"

function MainPage() {

    const dispatch = useDispatch()

    React.useEffect(async () => {
        await dispatch(updateTemperaments())
        await dispatch(getAllTemperaments())
    }, [dispatch])

    return <div>
        <h1>Henry Dogs</h1>        
        <Link to="/home"><button>Ir al Home</button></Link>
    </div>
}

export default MainPage