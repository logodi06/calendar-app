import React, { useEffect, useState } from 'react';
//para que podamos tomar la fecha del momento del servidor
import moment from 'moment';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import  Swal  from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

//iniciar la hora pero co-mo 0 minutos, 0 segundos, y se hace con moment
//moment toma la fecha y hora del momento
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endClone = now.clone().add(1, 'hours');


//para restablecer los valores del formulario
const initEvent = {
  title: '',
  notes: '',
  start:  now.toDate(),
  end: endClone.toDate()
}

export const CalendarModal = () => {
  //para obtener el valor de false/true y saber si el modal debe mostrarse o no
  const { modalOpen } = useSelector( state => state.ui );

  //para el useEffect se necesita el evento activo
  const { activeEvent } = useSelector( state => state.calendar );
  
  const dispatch = useDispatch();

  //state que va acontrolar la fecha  de inicio, así como los cambios de cada fecha que se elijan
  const [dateStart, setDateStart] = useState( now.toDate());
 
  //state que controla la fecha de termino.
  const [dateEnd, setDateEnd] = useState( endClone.toDate() );

  //estado por defecto que va a tener el evento
  const [formValues, setFormValues] = useState( initEvent );

  const { title, notes, start, end } = formValues;

  const [titleValid, setTitleValid] = useState(true)

  //efecto para  que este al pendiente de si selecciona un evento, para que se  muestre la información del evento seleccionado
  useEffect(() => {
    //si hay evento activo, se debe mostrar información del evento seleccionado
    if( activeEvent ){
      setFormValues( activeEvent );
    } else {
      //si no hay envento activo, que es el caso cuando se elimina el evento, los valores del form se deben resetear a blanco con el initEvent
      setFormValues ( initEvent );
    }
    //console.log(activeEvent);
  }, [ activeEvent, setFormValues ])
  

  //cambios en el modal
  const handleInputChange = ( {target} ) => {
    setFormValues( {
      ...formValues,
      [target.name]: target.value
    })
  }

  //cerrar el modal
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  }

  
  //función que recibe como evento la fecha de DateTimePicker
  const handleStartDateChange = ( e ) => {
    setDateStart( e );
    //console.log(e);
    setFormValues( {
      ...formValues,
       start: e
    });
  }

  const handleEndDateChange = ( e ) => {
    setDateEnd ( e );
    //console.log( e );
    setFormValues ( {
      ...formValues,
      end: e
    });
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();
    
    const momentStart =  moment( start );
    const momentEnd = moment( end );
    //validar que la primera fecha no sea igual o antes de la segunda
    if(momentStart.isSameOrAfter( momentEnd ) ) {
      return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
    }

    if(title.trim().length < 2 ) {
      return setTitleValid(false);
    }

    if( activeEvent ){
      //en el formValues ya traemos los nuevos datos que el usuario actualize, así que solo eso se manda
      dispatch(eventUpdated ( formValues ));
    } else{
      //para agregar un evento, despues de darle submit con lo que se haya llenado en el formulario
      dispatch( eventAddNew( {
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '123',
          name: 'LoreGD'
        }
      } ));

    }


    setTitleValid(true);
    closeModal();
  }

  //para traer los datos del store y saber si el modal debe ser false o true para mostrarse
 

  return (
    <Modal
        isOpen={ modalOpen }
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={ customStyles }
        closeTimeoutMS = { 200 }
        className = "modal"
        overlayClassName= "modal-fondo"
      >
        

        <h1> { ( activeEvent ) ? 'Editar Evento' : 'Nuevo Evento'} </h1>
      <hr />
      <form className="container" onSubmit={ handleSubmitForm }>

          <div className="form-group">
              <label>Fecha y hora inicio</label>
              <DateTimePicker onChange={ handleStartDateChange } value={dateStart} className="form-control" />
          </div>

          <div className="form-group">
              <label>Fecha y hora fin</label>
              <DateTimePicker onChange={handleEndDateChange} value={ dateEnd } minDate={dateStart} className="form-control"  />
          </div>

          <hr />
          <div className="form-group">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  //Si el titulo es invalido debe colocar la clase de is invalid
                  className={ `form-control ${ !titleValid && 'is-invalid'}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={ title }
                  onChange = { handleInputChange }
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={ notes }
                  onChange = { handleInputChange }

              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>

    </Modal>
  )
}
