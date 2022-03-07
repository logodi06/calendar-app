import  moment  from "moment";
import { types } from "../types/types";

const initialState = {
    events: [ {
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        //fecha de inicio del evento
        start: moment().toDate(), //esto al sinonimo de hacer un new Date
        //fecha final del evento, aquí se le estan agregando 2 horas a la hora de inicio 
        end: moment().add( 2, 'hours').toDate(),
        bgColor:'#fafafa',
        notes: 'Comprar el pastel',
        user: {
          _id: '123',
          name: 'Fernando'
        }
      }
    ],
    activeEvent: null
};

export const calendarReducer = ( state= initialState, action ) => {
    switch ( action.type ) {
         case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            };
         
            //agregar al Store el nuevo evento
         case types.eventAddNew: 
             return {
                 ...state,
                 events: [ ...state.events, action.payload ]
             }
            
         case types.eventClearActiveEvent:
             return {
                 ...state,
                 activeEvent: null
             }    
         
         case types.eventUpdated:
             return {
                 ...state,
                 //como se va a modificar un evento que ya tenemos, se tiene que buscar el id de ese evento
                 //para poder hacer la actualización, se recorre todos los eventos hasta que encuentra el que es igual al id
                 events: state.events.map( 
                     //e es el evento, si lo encuentra, actualiza los datos del event por los nuevos, si no regresa así tal cual esta el event
                     e => ( e.id === action.payload.id ) ? action.payload : e
                 )
             };
         case types.eventDeleted:
             return {
                 ...state,
                 //para elimiar ocupamos el filter para que me regrese un nuevo arreglo pero ahora sin el elemento que se requeire eliminar
                 events: state.events.filter( 
                     //como no tenemos payload, el id que se necesita lo tenemos dentro del mismo state,
                     //en el evento activo (activeEvent)
                     //si el id del evento que se esta evaluando es diferente al id que se quiere eliminar (que en este caso es state.activeEvent.id)
                     //se va a regresar todo el arreglo menos el evento que se quiere eliminar
                     e => ( e.id !== state.activeEvent.id )
                 ),
                 activeEvent: null
             };

        default:
            return state;
    }
}