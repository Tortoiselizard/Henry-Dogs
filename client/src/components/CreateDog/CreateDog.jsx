import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from "./../../redux/actions/index"
import { useSelector } from 'react-redux';

const regexName = /[^A-Za-zÁ-Úá-úñ ]/
const regexNumber = /[^0-9.]/
const regexURL = /^https:\/\/[^\0]+\.[a-z]{3}\b/

function validate(inputs) {
    const errors = {
        name:"",
        height:{min:"", max:""},
        weight:{min:"", max:""},
        life_span:{min:"", max:""},
        image:"",
        temperaments:""
    }
    const {name, height, weight, life_span, image, temperaments} = inputs

    if (name[0] === " ") {errors.name = "El nombre debe comenzar por una letra"}
    else if (regexName.test(name)) {errors.name = "El nombre solo puede contener letras y/o espacios"}
    else if (name.length<3 || name.length>20) {errors.name = "El nombre debe estar comprendido entre 3-20 caracteres"}

    if (!height.min) {errors.height.min = "Este espacio no puede estar vacio"}
    else if (regexNumber.test(height.min)) {errors.height.min = "Debes escribir solo números en esta casilla"}
    else if (height.min <= 0) {errors.height.min = "La altura mínima del perro no puede ser un número negativo o cero"}

    if (regexNumber.test(height.max)) {errors.height.max = "Debes escribir solo números en esta casilla"}
    else if (height.max < 0) {errors.height.max = "La altura máxima del perro no puede ser un número negativo"}

    if (!weight.min) {errors.weight.min = "Este espacio no puede estar vacio"}
    else if (regexNumber.test(weight.min)) {errors.weight.min = "Debes escribir solo números en esta casilla"}
    else if (weight.min <= 0) {errors.weight.min = "El peso mínimo del perro no puede ser un número negativo o cero"}

    if (regexNumber.test(weight.max)) {errors.weight.max = "Debes escribir solo números en esta casilla"}
    else if (weight.max < 0) {errors.weight.max = "El peso máxima del perro no puede ser un número negativo"}

    if (regexNumber.test(life_span.min) && life_span.length) {errors.life_span.min = "Debes escribir solo números en esta casilla"}
    else if (life_span.min < 0 || life_span.min === "0") {errors.life_span.min = "Los años mínimos de vida del perro no puede ser un número negativo o cero"}

    if (regexNumber.test(life_span.max) && life_span.length) {errors.life_span.max = "Debes escribir solo números en esta casilla"}
    else if (life_span.max < 0 || life_span.max === "0") {errors.life_span.max = "Los años máximos de vida del perro no puede ser un número negativo"}

    if (!regexURL.test(image) && image.length) {errors.image = "Debe corresponder a una URL que comieza con https:// y termine con . seguido de cualquier formato de imagen"}

    return errors
}

const CreateDog = () => {

    const [inputs, setInputs] = React.useState({
        name:"",
        height:{min:"", max:""},
        weight:{min:"", max:""},
        life_span:{min:"", max:""},
        image:"",
        temperaments:[]
    })
    const [errors, setErrors] = React.useState({
        name:"",
        height:{min:"", max:""},
        weight:{min:"", max:""},
        life_span:{min:"", max:""},
        image:"",
        temperaments:""
    })

    const temperamentsGS = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getAllTemperaments())
    }, [dispatch])

    function handleChange(event) {
        setInputs((inputs) => {
            if (event.target.name.slice(-3)==="min" || event.target.name.slice(-3)==="max") {
                return {
                    ...inputs,
                    [event.target.name.split("-")[0]]:{
                        ...inputs[event.target.name.split("-")[0]],
                        [event.target.name.split("-")[1]]:event.target.value
                    }
                }
            } else {
                return {...inputs, [event.target.name]:event.target.value}
            }
        })
        setErrors(errors => {
            if (event.target.name.slice(-3)==="min" || event.target.name.slice(-3)==="max") {
                return validate({
                    ...inputs,
                    [event.target.name.split("-")[0]]:{
                        ...inputs[event.target.name.split("-")[0]],
                        [event.target.name.split("-")[1]]:event.target.value
                    }
                })
            } else {
                return validate({...inputs, [event.target.name]:event.target.value})
            }
            
        })
    }

    async function addTemperament() {
        const input = document.getElementsByName("inputTemperament")["0"]
        const temperament = input.value[0].toUpperCase() + input.value.slice(1).toLowerCase()
        if (temperamentsGS.includes(temperament)) {
            if (!inputs.temperaments.includes(temperament)) {
                setInputs(inputs => ({
                    ...inputs,
                    temperaments: [...inputs.temperaments, temperament]
                }))
                setErrors(erros => ({
                    ...errors,
                    temperaments: ""
                }))
                input.value=""
            }
            else {
                setErrors(errors => ({
                    ...errors,
                    temperaments: "Este temperamento ya fué anexado"
                }))
            }
        } else {
            setErrors(errors => ({
                ...errors,
                temperaments: "Este temperamento no existe"
            }))
        }
    }

    function popTemperament(event) {
        const id = event.target.name.slice(16)
        setInputs(inputs => {
            let temperaments = [...inputs.temperaments]
            temperaments.splice(id, 1)
            return {
                ...inputs,
                temperaments
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const errorsObj = validate(inputs)
        setErrors(errors => errorsObj)
        let allGood = true
        for (let error in errorsObj) {
            if (typeof(errorsObj[error])==="string") {
                if (errorsObj[error].length) {
                    allGood=false
                }
            }
            else if (typeof(errorsObj[error])==="object") {
                if (errorsObj[error].min.length) {
                    allGood=false
                }
                if (errorsObj[error].max.length) {
                    allGood=false
                }
            }
        }
        if (allGood) {
            const action = await actions.getDogDetail(inputs.name)
            if (typeof(action.payload) !== "string") {return alert(`La raza de perro ${action.payload.name} ya existe`)}
            const temperaments = inputs.temperaments.map(temperament => temperamentsGS.indexOf(temperament)+1)
            const newDog = {
                    name: inputs.name.includes(" ")? 
                        inputs.name.split(" ").map(nombre => nombre[0].toUpperCase() + nombre.slice(1).toLowerCase()).join(" "):
                        inputs.name[0].toUpperCase() + inputs.name.slice(1).toLowerCase(),
                    height: inputs.height.min + (inputs.height.max? " - " + inputs.height.max:""),
                    weight: inputs.weight.min + (inputs.weight.max? " - " + inputs.weight.max:""),
                    life_span: inputs.life_span.min + (inputs.life_span.max? " - " + inputs.life_span.max:""),
                    temperaments: temperaments,
                    image: inputs.image
            }
            const data = {
                method: 'Post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newDog)
            }

            const response = await fetch(`http://localhost:3001/dogs`, data)
                .then((data) => data.json())
                .then(data => data)
                .catch(error => error.message);
            if (typeof(response) === "string") {return alert(response)}
            else {
                alert(`La raza de perro ${inputs.name} fue creada exitosamente`)
                setInputs((inputs) => ({
                name:"",
                height:{min:"", max:""},
                weight:{min:"", max:""},
                life_span:{min:"", max:""},
                image:"",
                temperaments:[]
                }))
                setErrors((errors) => ({
                    name:"",
                    height:{min:"", max:""},
                    weight:{min:"", max:""},
                    life_span:{min:"", max:""},
                    image:"",
                    temperaments:""
                }))
            }
        } else {
            alert("Debes corregir los errores antes de crear el nuevo perro")
        }
        
        // const newDog = {
        //     name: "Gladys",
        //     height: "1.25",
        //     weight: "15.2",
        //     life_span: 10,
        //     image: "https://cdn.britannica.com/78/232778-050-D3701AB1/English-bulldog-dog.jpg",
        //     temperaments: [1,4,6]
        //   }
        // const data = {
        //     method: "Post",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(newDog)
        // }

        // fetch(`http://localhost:3001/dogs`, data)
        //     .then((data) => data.json())
        //     .then(data => {alert("La raza fue creada exitosamente")}).catch(data => {alert(data)});
    }

    return <div>
        <h1>Voy a crear un perro con CreateDog</h1>
        <label>Nombre de la Raza : </label>
        <input onChange={handleChange} value={inputs.name} name="name" type="text" placeholder="Escribe el nombre..."></input>
        <p>{errors.name}</p>
        <br/>

        <label>Altura : </label>
        <label>min (cm) : </label>
        <input onChange={handleChange} value={inputs.height.min} name="height-min" type="text" placeholder="altura minima..."></input>
        <p>{errors.height.min}</p>
        <label>max (cm) : </label>
        <input onChange={handleChange} value={inputs.height.max} name="height-max" type="text" placeholder="altura máxima..."></input>
        <p>{errors.height.max}</p>
        <br/>

        <label>Peso : </label>
        <label>min (kg) : </label>
        <input onChange={handleChange} value={inputs.weight.min} name="weight-min" type="text" placeholder="peso minimo..."></input>
        <p>{errors.weight.min}</p>
        <label>max (kg) : </label>
        <input onChange={handleChange} value={inputs.weight.max} name="weight-max" type="text" placeholder="peso minimo..."></input>
        <p>{errors.weight.max}</p>
        <br/>

        <label>Años de vida</label>
        <label>min :</label>
        <input onChange={handleChange} value={inputs.life_span.min} name="life_span-min" type="text" placeholder="edad mínima..."></input>
        <p>{errors.life_span.min}</p>
        <label>max :</label>
        <input onChange={handleChange} value={inputs.life_span.max} name="life_span-max" type="text" placeholder="edad máxima..."></input>
        <p>{errors.life_span.max}</p>
        <br/>

        <label>Imagen : </label>
        <input onChange={handleChange} value={inputs.image} name="image" type="text" placeholder="URL..."></input>
        <p>{errors.image}</p>
        <br/>

        <label>Temperamentos : </label>
        <input name="inputTemperament" type="text" placeholder="temperamento..." onKeyPress={(event) => {if (event.key === "Enter") addTemperament()}}></input>
        <button onClick={addTemperament}>+</button>
        <p>{errors.temperaments}</p>
        <span>{inputs.temperaments.map((temperament, index) => <div key={index}>
           
            <label name={`temperamentAdded${index}`}>{temperament}</label>
            <button onClick={popTemperament} name={`temperamentAdded${index}`}>x</button>
        
        </div>
        )}</span>
        <br/>

        <button type="submit" onClick={handleSubmit}>Create new Dog</button>
    </div>
};

export default CreateDog;