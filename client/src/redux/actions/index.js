export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAILS = "GET_DOG_DETAILS"
export const CREATE_DOG = "CREATE_DOG"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const GET_DOGS_FOR_TEMPERAMENTS = "GET_DOGS_FOR_TEMPERAMENTS"
export const ADD_TEMPERAMENT_FILTER = "ADD_TEMPERAMENT_FILTER"

// 🟢 getAllDogs:
// Esta función debe realizar una petición al Back-End. Luego despachar una action con la data recibida. End-Point: 'http://localhost:3001/dogs'.
export const getAllDogs = (name) => {
    if (!name) {
        return function (dispatch) {
            return fetch('http://localhost:3001/dogs')
            .then((response) => response.json())
            .then((data) => {dispatch({ type: GET_ALL_DOGS, payload: data})});
            }
    }
    else {
        return function (dispatch) {
            return fetch(`http://localhost:3001/dogs?name=${name}`)
            .then((response) => response.json())
            .then((data) => {dispatch({ type: GET_ALL_DOGS, payload: data})});
            }
    }
}

// 🟢 getDogDetail:
// Esta función debe hacer una petición al Back-End. Ten en cuenta que tiene que recibir la variable "id" por parámetro. Luego despachar una action con la data recibida. End-Point: 'http://localhost:3001/dogs/:idRaza'.
export const getDogDetail = (id) => {
    return function (dispatch) {
        return fetch(`http://localhost:3001/dogs/${id}`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: GET_DOG_DETAILS, payload: data}));
        }
};

export const cleanDetail = () => {
    return {type: CLEAN_DETAIL, payload:{}}
}

// 🟢 createDog: Esta función debe recibir una variable "dog" por parámetro. Luego retornar una action que, en su propiedad payload:
//    - haga un spread operator de la variable dog, para copiar todo su contenido.

export const createDog = (dog) => {
    return {
        type: CREATE_DOG,
        payload: {...dog}
    }
};

export const getAllTemperaments= () => {
    return function (dispatch) {
        return fetch('http://localhost:3001/temperaments')
        .then((response) => response.json())
        .then((data) => {dispatch({ type: GET_TEMPERAMENTS, payload: data})});
        }
}

export const getDogsForTemperaments = (filter) => {
    return function (dispatch) {
        return fetch('http://localhost:3001/dogs')
        .then((response) => response.json())
        .then((data) => data.filter(dog => {
            const temperamentsDog = dog.temperament? dog.temperament.split(", "):"null"
            for (let temperamentFilter of filter) {
                if (temperamentsDog.includes(temperamentFilter)) continue
                else return false
            }
            return true
        }))
        .then((data) => {dispatch({ type: GET_DOGS_FOR_TEMPERAMENTS, payload: data})});
    }
}

export const addTemperamentsFilter = (temperament) => {
    return {type: ADD_TEMPERAMENT_FILTER, payload: temperament}
}