import axios from "axios";
import { createContext, useReducer } from "react";
import * as Constants from '../Constants';
import contextReducer from "./ContextReducer";

const MyContext = createContext();

/*
    Notes: Standard Context setup
*/
export const ContextProvider = ({children}) => {
    const initialState = {
        loading: false,
        success: false,
        errors: [],
        supers: [],
        superLabels: []
    }

    const [state, dispatch] = useReducer(contextReducer, initialState);

    /*
        Call to get supervisors list as an array of json objects
        Then create an array of labels to easily use in dropdown
    */
    const getSupers = async() => {
        setContext(Constants.SET_LOADING, true);
        let res = await axios.get(`${Constants.apiURL}/api/supervisors`);
        setContext(Constants.SET_SUPERS, res.data);
        setContext(Constants.SET_SUPER_LABELS, res.data.map(s => s.supervisor));
        setContext(Constants.SET_LOADING, false);
    }

    /*
        Post call to submit notification
        If any errors are returned, display them in form
        otherwise, set success to true
    */
    const submitNotification = async(customer) => {
        setContext(Constants.SET_LOADING, true);
        let res  = await axios.post(`${Constants.apiURL}/api/submit`, customer)
        if(res.data != 'success'){
            console.log('errors!')
            console.log(res.data.errors)
            setContext(Constants.SET_ERRORS, res.data.errors)
        }else{
            setContext(Constants.SET_SUCCESS, true);
        }
        setContext(Constants.SET_LOADING, false);
    }
    
    const setContext = (type, payload) => {
        dispatch({type, payload})
    }


    return <MyContext.Provider value = {{
        ...state,
        getSupers,
        setContext,
        submitNotification
    }}>
        {children}
    </MyContext.Provider>

}

export default MyContext;