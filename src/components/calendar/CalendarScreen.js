// https://github.com/jquense/react-big-calendar#readme pagina de donde se obtiene CAlendar
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import { CalendarEvent } from './CalendarEvent';
import { Navbar } from '../ui/Navbar';
import { messages } from "../../helpers/calendar-messages-es";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeletedEventFab } from '../ui/DeletedEventFab';

//moment coloca los días de la semana en la tabla, pero lo hace en Inglés, con esto y la importación lo cambiamos a español
moment.locale('es');
const localizer = momentLocalizer(moment);

//creamos el evento
// const events = [{
//   title: 'Cumpleaños del jefe',
//   //fecha de inicio del evento
//   start: moment().toDate(), //esto al sinonimo de hacer un new Date
//   //fecha final del evento, aquí se le estan agregando 2 horas a la hora de inicio 
//   end: moment().add( 2, 'hours').toDate(),
//   bgColor:'#fafafa',
//   notes: 'Comprar el pastel',
//   user: {
//     _id: '123',
//     name: 'Fernando'
//   }
// }]

export const CalendarScreen = () => {

  //console.log( modalOpen );
  const dispatch = useDispatch();
  
  //Leer los eventos del Store
   //leer el activeEvent que esta en el store, si hay evento activo se debe mostrar el boton de eliminar evento, si no no lo debe de mostrar
  const { events, activeEvent } = useSelector( state => state.calendar );

 
  


  //utilizamos el useState para poder tener una variable que cuando cambie, actualice las cosas
  //si en el localStorage tenemos algo lo coloque ahí, si no hay nada por defecto lo coloque en month
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month')

  //función que dal dar doble click, nos muestra el modal
  const onDoubleClick = ( e ) => {
    //console.log(e);
    dispatch(uiOpenModal());
   
  }

  const onSelectEvent = ( e ) => {
    //console.log(e)
    dispatch(eventSetActive(e));
   
  }

  //nos da el evento de que visualización estamos seleccionado mes/semana/dia/agenda
  const onViweChange = ( e ) => {
    
    setLastView( e );
    localStorage.setItem( 'lastView', e ) ;
    
  };

  const onSelectSlot = ( e ) => {
      //console.log(e);
      dispatch( eventClearActiveEvent());
  }

  //esta  función se dispara con el evento, la fecha de inicio, la fecha fin, y el isSelected
  //lo que sea que regrese esta función es el estilo que le va a aplicar a ese evento en particular
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log(event, start, end, isSelected);

    //se pueden definir los estilos de las notas
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
       style
    }

  };


  return (
    <div className='calendar-screen'>
        <Navbar/>
        <Calendar
          localizer={ localizer }
          events={ events }
          startAccessor="start"
          endAccessor="end"
          // style={{ height: 500 }}
          //en helpers definimos las variables de como queremos que se muestren los msjs en este caso que sea en español
          messages={ messages }
          //aquí se manda lo que regrese la función definida arriba eventStyleGetter
          eventPropGetter = { eventStyleGetter }
          onDoubleClickEvent = { onDoubleClick }
          
          //para  cuando se seleccione el evento en el calendario, el evento es la nota que se coloca
          onSelectEvent = {onSelectEvent}

          onView = { onViweChange }

          onSelectSlot = { onSelectSlot }
          selectable = { true }

          //vista que va a tener, mes, semana, día, agenda
          view = { lastView }

          //components, le podemos pasar los eventos definidos en CalendarEvent
          components = { {
            //el event será pasado a calendarEvent
            event: CalendarEvent 
          }}
        />
        
        <AddNewFab />
        {
          ( activeEvent ) &&  <DeletedEventFab />
        }
       
        <CalendarModal />

    </div>
  )
}
