import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/header/Header'
import Contact from './components/contact/Contact'
import About from './components/about/About'
import Footer from './components/footer/Footer'
import FuturePlanning from './components/futurePlanning/FuturePlanning'
import ImmediateNeed from './components/immediateNeed/ImmediateNeed'
import Services from './components/services/Services'
import Mourning from './components/mourning/Mourning'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/dashboard/login/Login'
import ProtectedRoute from './components/dashboard/ProtectedRoute'
import Register from './components/dashboard/login/Register'
import RegisterUser from './components/dashboard/login/RegisterUser'
import ForgotPassword from './components/dashboard/login/forgotPassword/ForgotPassword'
import ResetPassword from './components/dashboard/login/resetPassword/ResetPassword'
import { useState } from 'react'

function App() {
  // Estado para manejar el idioma
  const [language, setLanguage] = useState('es') // Idioma predeterminado

  return (
    <Routes>
      {/* Rutas que no muestran el Header */}
      <Route path='/dashboard/login' element={<Login />} />
      <Route path='/dashboard/register/:token' element={<RegisterUser />} />
      <Route path='/dashboard/register' element={<Register />} />
      <Route path='/dashboard/forgot-password' element={<ForgotPassword />} />
      <Route path='/dashboard/reset-password/:token' element={<ResetPassword />} />
      <Route
        path='/dashboard/*'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Rutas que sí muestran el Header */}
      <Route
        path='*'
        element={
          <>
            {/* Header visible en todas las rutas excepto en dashboard */}
            <Header language={language} setLanguage={setLanguage} />
            <Routes>
              <Route path='/' element={<Home language={language} />} />
              <Route path='/contact' element={<Contact language={language} />} />
              <Route path='/about' element={<About language={language} />} />
              <Route path='/future-planning' element={<FuturePlanning language={language} />} />
              <Route path='/immediate-need' element={<ImmediateNeed language={language} />} />
              <Route path='/services' element={<Services language={language} />} />
              <Route path='/mourning' element={<Mourning language={language} />} />
            </Routes>
            <Footer language={language} setLanguage={setLanguage} />
          </>
        }
      />
    </Routes>
  )
}

export default App;

