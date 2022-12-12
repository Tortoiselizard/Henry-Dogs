import {GET_ALL_DOGS, GET_DOG_DETAILS, CREATE_DOG, GET_TEMPERAMENTS} from "../actions"

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
        default:
            return state
    }
}

export default rootReducer