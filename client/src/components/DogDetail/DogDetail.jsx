import React from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {getDogDetail, cleanDetail} from "../../redux/actions/index"

function DogDetail() {

    const dogDetail = useSelector(state => state.dogDetail)

    const {id} = useParams()
    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(getDogDetail(id))
        return function() {
            dispatch(cleanDetail())
        }
    },[id])

    return <div>
        <h1>Estoy en el detalle del perro DogDetail</h1>
        {Object.keys(dogDetail).length?<div>
            <p>{dogDetail.name}</p>
            <img src={dogDetail.image} alt={dogDetail.name}></img>
            <p>Temperaments: <span>{dogDetail.temperament}</span></p>
            <p>Height: <span>{dogDetail.height.imperial}</span></p>
            <p>Weight: <span>{dogDetail.weight.imperial}</span></p>
            <p>years: <span>{dogDetail.life_span}</span></p>        
        </div>:null}
    </div>
};

export default DogDetail;