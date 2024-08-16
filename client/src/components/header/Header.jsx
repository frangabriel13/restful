import React from "react";
import s from "./Header.module.css"
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId);
  };
  
  const toggleMenu = (sectionId) => {
    setMenuOpen(!menuOpen);
  
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className={`${s.container} ${isScrolled ? s.scrolled : ""}`}>
      <div>
        {/* <Link to="/" onClick={() => toggleMenu('home')} className={s.logo}>Eternal Restful</Link> */}
        <Link to="/" onClick={() => toggleMenu('home')} className={s.logo}>
          <img src={logo} alt="logo" className={s.logo} />
        </Link>
      </div>
      <div className={s.divNav}>
        <nav className={`${s.navbar} ${menuOpen ? s.open : ''}`}>
            <Link to="/about" onClick={() => toggleMenu('about')}>Quiénes somos</Link>
            <Link to="/future-planning" onClick={() => toggleMenu('future-planning')}>Planes a futuro</Link>
            <Link to="/immediate-need" onClick={() => toggleMenu('immediate-need')}>Necesidad inmediata</Link>
            <Link to="/services" onClick={() => toggleMenu('services')}>Tipos de servicio</Link>
            <Link to="/contact" onClick={() => toggleMenu('contact')}>Contacto</Link>
            <Link to="/mourning" onClick={() => toggleMenu('mourning')}>Duelo</Link>
            {/* <Link to="/faq" onClick={() => toggleMenu('faq')}>Preguntas frecuentes</Link> */}
            <button className={s.btnQuote}>Pedir cotización</button>
        </nav>
      </div>
      <div className={s.navToggle}>
        <IoMdMenu className={s.btnMenu} onClick={toggleMenu} />
      </div>
    </div>
  );
}

export default Header;

// cambiar a a Link para que no recargue la pagina