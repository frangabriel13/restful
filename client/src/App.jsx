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

function App() {
  return (
    <Routes>
      {/* <Route path='/dashboard/*' element={<Dashboard />} /> */}
      <Route path='/dashboard/login' element={<Login />} />
      <Route
        path='/dashboard/*'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='*'
        element={
          <>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/future-planning' element={<FuturePlanning />} />
              <Route path='/immediate-need' element={<ImmediateNeed />} />
              <Route path='/services' element={<Services />} />
              <Route path='/mourning' element={<Mourning />} />
            </Routes>
            <Footer />
          </>
        }
      />
    </Routes>
  )
}

export default App;
