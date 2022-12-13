import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from "./../../redux/actions/index"

function validate(input) {
    //   const errors = {}
    //   if (input.name.length>30) {
    //         errors.name = "Nombre u Origen demasiado largo"
    //   }
    //   if (input.origin.length>30) {
    //         errors.origin = "Nombre u Origen demasiado largo"
    //   }
    //   if (input.tickets<0) {
    //         errors.tickets = "Los tickets deben ser un numero positivo" 
    //   }
    //   return errors
}

const CreateDog = () => {
    //   const [input, setInput] = React.useState({
    //         name: "",
    //         origin: "",
    //         description: "",
    //         tickets: 0
    //   })
    //   const [errors, setErrors] = React.useState({
    //         name: "",
    //         origin: "",
    //         tickets: 0
    //   })

    //   const dispatch = useDispatch()

    //   function handleChange(evento) {
    //         setInput({...input, [evento.target.name]: evento.target.value})
    //         setErrors(validate({...input, [evento.target.name]: evento.target.value}))
    //   }

    //   function handleSubmit(evento) {
    //         evento.preventDefault()
    //         if (!(Object.keys(errors).length)) {
    //               window.alert("Se envío la banda")
    //               return dispatch(actions.createBands(input))
    //         } else {
    //               window.alert("No puedes tener errores")
    //         }
    //   }

    //   return <div>
    //         <form>
    //               <label>Name: </label>
    //               <input type="text" name="name" value={input.name} onChange={handleChange}></input>
    //               <p>{errors.name}</p>

    //               <label>Origin: </label>
    //               <input type="text" name="origin" value={input.origin} onChange={handleChange}></input>
    //               <p>{errors.origin}</p>

    //               <label>Description: </label>
    //               <textarea name="description" value={input.description} onChange={handleChange}></textarea>

    //               <label>Tickets: </label>
    //               <input type="number" name="tickets" value={input.tickets} onChange={handleChange}></input>
    //               <p>{errors.tickets}</p>

    //               <button onClick={handleSubmit} type="submit">Create Band</button>
    //         </form>
    //   </div>;
    return <div>
        <h1>Voy a crear un perro con CreateDog</h1>
    </div>
};

export default CreateDog;