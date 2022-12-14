import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from "./../../redux/actions/index"

const regexName = /[^A-Za-z ]+/
const regexNumber = /[^0-9.]/

function validate(inputs) {
    const errors = {}
    const {name, height, weight, years} = inputs

    // if (inputs.name==="") errors.name = "El nombre no puede estar vacio"
    if (!name.length) {errors.name = "Este espacio no puede estar vacio"}
    else if (name[0] === " ") {errors.name = "El nombre debe comenzar por una letra"}
    else if (regexName.test(name)) {errors.name = "El nombre solo puede contener letras y/o espacios. No colocar acentos"}

    // if (inputs.height > 3) errors.height = "La altura del perro no puede ser mayor a 3 m"
    if (!height.length) {errors.height = "Este espacio no puede estar vacio"}
    else if (regexNumber.test(height)) {errors.height = "Este espacio debe tener solo números"}
    else if (height > 5) {errors.height = "La altura del perro no puede ser mayor a 5 m"}
    else if (height <= 0) {errors.height = "La altura del perro no puede ser un número negativo o cero"}

    // if (inputs.weight > 100) errors.weight = "El peso del perro no puede ser mayor a 100 kg"
    if (!weight.length) {errors.weight = "Este espacio no puede estar vacio"}
    if (regexNumber.test(weight)) {errors.weight = "Este espacio debe tener solo números"}
    else if (weight>100) {errors.weight = "El peso del perro no puede ser mayor a 100 kg"}
    else if (weight < 0) {errors.weight = "El peso del perro no puede ser un número negativo o cero"}

    // if (inputs.years > 30) errors.years = "Los años de vida del perro no pueden ser mayores a 30 años"
    if (regexNumber.test(years)) {errors.years = "Este espacio debe tener solo números"}
    else if (years>30) {errors.years = "Los años del perro no puede ser mayor a 30"}
    else if (years < 0) {errors.years = "Los años del perro no puede ser un número negativo o cero"}

    return errors
}

const CreateDog = () => {

    const [inputs, setInputs] = React.useState({
        name:"",
        height:"",
        weight:"",
        years:"",
        temperaments:""
    })
    const [errors, setErrors] = React.useState({
        name:"",
        height:"",
        weight:""
    })

    function handleChange(event) {
        setInputs((inputs) => ({...inputs, [event.target.name]:event.target.value}))
        setErrors(errors => validate({...inputs, [event.target.name]:event.target.value}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        setErrors(validate(inputs))
        if (!Object.keys(errors).length) {
            alert("Perro creado")
            setInputs(() => ({
                name:"",
                height:"",
                weight:"",
                years:"",
                temperaments:""
            }))
            setErrors(() => ({
                name:"",
                height:"",
                weight:""
            }))
        }
        else {
            alert("Debes corregir los errores antes de crear el nuevo perro")
        }
    }

    return <div>
        <h1>Voy a crear un perro con CreateDog</h1>
        <label>Name : </label>
        <input onChange={handleChange} value={inputs.name} name="name" type="text" placeholder="Escribe el nombre..."></input>
        <p>{errors.name}</p>
        <br/>

        <label>Height (mts) : </label>
        <input onChange={handleChange} value={inputs.height} name="height" type="text" placeholder="Escribe la altura..."></input>
        <p>{errors.height}</p>
        <br/>

        <label>Weight (kg) : </label>
        <input onChange={handleChange} value={inputs.weight} name="weight" type="text" placeholder="Escribe el peso..."></input>
        <p>{errors.weight}</p>
        <br/>

        <label>Years : </label>
        <input onChange={handleChange} value={inputs.years} name="years" type="text" placeholder="Escribe los años de vida..."></input>
        <p>{errors.years}</p>
        <br/>

        <label>Temperaments : </label>
        <input onChange={handleChange} value={inputs.temperaments} name="temperaments" type="text" placeholder="Escribe los temperamentos..."></input>
        <p></p>
        <br/>

        <button type="submit" onClick={handleSubmit}>Create new Dog</button>
    </div>
};

export default CreateDog;