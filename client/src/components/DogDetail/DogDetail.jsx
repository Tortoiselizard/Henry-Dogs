import React from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getDogDetail, cleanDetail} from "../../redux/actions/index"

function DogDetail() {

    const dogDetail = useSelector(state => state.dogDetail)

    const {raza_perro} = useParams()
    // const params = useParams()
    // console.log(raza_perro)
    const dispatch = useDispatch()

    React.useEffect(async ()=> {
        // console.log(id)
        const action = getDogDetail(raza_perro)
        if (typeof(action.payload) === "string") {return alert(action.payload)}
        dispatch(action)
        return function() {
            dispatch(cleanDetail())
        }
    },[raza_perro])

    return <div>
        <h1>Estoy en el detalle del perro DogDetail</h1>
        {Object.keys(dogDetail).length?<div>
            <h1>{dogDetail.name}</h1>
            <img src={dogDetail.image} alt={dogDetail.name}></img>
            <p>Temperaments: <span>{dogDetail.temperament}</span></p>
            <p>Height (cm): <span>{dogDetail.height}</span></p>
            <p>Weight (kg): <span>{dogDetail.weight}</span></p>
            <p>years: <span>{dogDetail.life_span}</span></p>        
        </div>:null}
    </div>
};

export default DogDetail;