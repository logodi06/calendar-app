
import { types } from "../types/types";

export const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

//para saber si hay un evento y queremos activarlo para obtener los datos
export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

//acción para limpiar la nota activa, cuando el modal del evento seleccionado se cierre
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});