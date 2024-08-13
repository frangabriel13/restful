import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/header/Header'
import Contact from './components/contact/Contact'
import About from './components/about/About'
import Footer from './components/footer/Footer'
import FuturePlanning from './components/futurePlanning/FuturePlanning'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/future-planning' element={<FuturePlanning />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
