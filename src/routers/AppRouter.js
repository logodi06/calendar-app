import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route,Navigate} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {
  return (
    // Uso de react router v6 
    <BrowserRouter>
       <Routes>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/" element={<CalendarScreen />} />
          {/* Si se escribe una dirección no valida lo redirecciona al CalendarScreen */}
          <Route path="/*"element={<Navigate replace to="/" />} />
          {/* <Route path="/*" element={<CalendarScreen /> } /> */}
      </Routes>
    </BrowserRouter>
  )
}
