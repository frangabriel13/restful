import React from "react";
import s from "./Header.module.css"
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

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
        <Link to="/" className={s.logo}>Eternal Restful</Link>
      </div>
      <div className={s.divNav}>
        <nav className={`${s.navbar} ${menuOpen ? s.open : ''}`}>
            <Link to="/" className={s.home} onClick={() => toggleMenu('home')}>Quiénes somos</Link>
            <Link to="/about" onClick={() => toggleMenu('about')}>Planes a futuro</Link>
            <Link to="/skills" onClick={() => toggleMenu('skills')}>Necesidad inmediata</Link>
            <Link to="/projects" onClick={() => toggleMenu('projects')}>Tipos de servicio</Link>
            <Link to="/contact" onClick={() => toggleMenu('contact')}>Contacto</Link>
            <Link to="/faq" onClick={() => toggleMenu('faq')}>Preguntas frecuentes</Link>
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