import {GET_ALL_DOGS, GET_DOG_DETAILS, CLEAN_DETAIL, CREATE_DOG, GET_TEMPERAMENTS, UPDATE_TEMPERAMENTS, GET_DOGS_FOR_TEMPERAMENTS, ADD_TEMPERAMENT_FILTER, ORDER_ABC, ORDER_WEIGHT} from "../actions"

const initialState = {
    dogs: [],
    dogDetail: {},
    temperaments: []
}

const rootReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: payload
            }
        case GET_DOG_DETAILS:
            return {
                ...state,
                dogDetail: payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                dogDetail: payload
            }

        case CREATE_DOG:
            return {
                ...state,
                dogs: [...state.dogs, payload]
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: payload
            }
        case GET_DOGS_FOR_TEMPERAMENTS:
            return {
                ...state,
                dogs: payload
            }
        case ADD_TEMPERAMENT_FILTER:
            return {
                ...state,
                temperaments: [...state.temperaments, payload]
            }
        case UPDATE_TEMPERAMENTS:
            return {
                ...state,
                temperaments: [...state.temperaments, payload]
            }
        case ORDER_ABC:
            return {
                ...state,
                dogs: payload
            }
        case ORDER_WEIGHT:
            return {
                ...state,
                dogs: payload
            }
        default:
            return state
    }
}

export default rootReducer