
import React from 'react'

//la función recibe el event
export const CalendarEvent = ( { event }) => {
    //console.log(event)
    const { title, user } = event;
  return (
    <div>
        <strong> {title} </strong>
        <span> - { user.name }</span>
    </div>
  )
}
