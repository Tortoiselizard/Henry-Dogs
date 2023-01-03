import React from "react";
import { Link } from 'react-router-dom';
import {updateTemperaments, getAllTemperaments} from "../../redux/actions/index"
import {useDispatch} from "react-redux"
import styles from "./MainPage.module.css"

function MainPage() {

    const dispatch = useDispatch()

    React.useEffect(async () => {
        await dispatch(updateTemperaments())
        await dispatch(getAllTemperaments())
    }, [dispatch])

    return <div className={styles.MainPage}>
        <h1>Henry Dogs</h1>        
        <Link to="/home"><button className={styles.buttonMainPage}>Burcar un Perro</button></Link>
    </div>
}

export default MainPage