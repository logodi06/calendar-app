import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

//Si existen las herramientas las va a configurar, si no simplemente las deja pasar
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//ahora solo hay que colocar el store dentro del <CalendarApp />
export const store = createStore( 
    rootReducer,
    //se utilizará thunk
    composeEnhancers ( 
        applyMiddleware( thunk )
    )

)