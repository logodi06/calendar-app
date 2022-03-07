
import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

export const DeletedEventFab = () => {
    const dispatch = useDispatch();

    const handleDeleted = () => {
      dispatch(eventDeleted());
    }

  return (
    <button onClick={ handleDeleted } className='btn btn-danger fab-danger'>
        <i className='fas fa-trash'></i>    
        <span> Borrar evento </span>
    </button>
  )
}
