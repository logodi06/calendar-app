import React from 'react'

//este provider se va a encargar de proveer información a todos sus hijos
import { Provider } from "react-redux";

import { AppRouter } from './routers/AppRouter'
import { store } from './store/store';

export const CalendarApp = () => {
  return (
    <Provider store= { store }>
        <AppRouter  />
    </Provider>
  )
}
