import { types } from "../types/types";

const initialState = {
    //al inicial, el modal estará cerrado
    modalOpen: false
}

export const uiReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                 modalOpen: true
            }
        
        case types.uiCloseModal: 
            return {
                ...state,
                modalOpen: false
            }    

        default:
            return state ;
    }
}