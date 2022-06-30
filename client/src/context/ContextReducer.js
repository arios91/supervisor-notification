import * as Constants from '../Constants'
/*
    Description: Standard ContextReducer setup
*/
const contextReducer = (state, action) => {
    switch(action.type){
        case Constants.SET_SUPERS:
            return{
                ...state,
                supers: action.payload
            }
        case Constants.SET_SUPER_LABELS:
            return{
                ...state,
                superLabels: action.payload
            }
        case Constants.SET_LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case Constants.SET_SUCCESS:
            return{
                ...state,
                success: action.payload
            }
        case Constants.SET_ERRORS:
            return{
                ...state,
                errors: action.payload
            }
        default:
            return state
    }
}

export default contextReducer;