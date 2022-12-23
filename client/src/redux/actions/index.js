export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAILS = "GET_DOG_DETAILS"
export const CREATE_DOG = "CREATE_DOG"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const GET_DOGS_FOR_TEMPERAMENTS = "GET_DOGS_FOR_TEMPERAMENTS"
export const ADD_TEMPERAMENT_FILTER = "ADD_TEMPERAMENT_FILTER"
export const ORDER_ABC = "ORDER_ABC"
export const ORDER_WEIGHT = "ORDER_WEIGHT"

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

export const getDogsForLocation = (location) => {
    if (location === "API") {
        return function (dispatch) {
            return fetch(`http://localhost:3001/dogs?location=${location}`)
            .then((response) => response.json())
            .then((data) => {dispatch({ type: GET_ALL_DOGS, payload: data})});
            }
    }
    else if (location === "DB") {
        return function (dispatch) {
            return fetch(`http://localhost:3001/dogs?location=${location}`)
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

export const orderAlfabetic = (data) => {
    // const sortData = data.sort((a,b) => {
    //     const wordA = a.name.toLowerCase()
    //     const wordB = b.name.toLowerCase()
    //     for (let i = 0; i < (wordA.length<wordB.length?wordA.length:wordB.length) ; i++) {
    //         if (wordA.charCodeAt(i)<wordB.charCodeAt(i)) return -1
    //         else if (wordA.charCodeAt(i)>wordB.charCodeAt(i)) return 1
    //     }
    //     return 0
    // })
    return {type: ORDER_ABC, payload: data}
}

export const orderWeight = (data) => {
    // const sortData = data.sort((a,b) => {
    //     const rangeA = a.weight.imperial.split(" - ")
    //     const rangeB = b.weight.imperial.split(" - ")
    //     if (rangeA[0]<rangeB[0]) return -1
    //     else if ((rangeA[0]>rangeB[0])) return 1
    //     else {return rangeA[1]-rangeB[1]}
    // })
    return {type: ORDER_WEIGHT, payload: data}
}