import React from "react";
import s from "./Header.module.css"
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";

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
        <a href="#home" className={s.logo}>Eternal Restful</a>
      </div>
      <div className={s.divNav}>
        <nav className={`${s.navbar} ${menuOpen ? s.open : ''}`}>
            <a href="#home" className={s.home} onClick={() => toggleMenu('home')}>Quiénes somos</a>
            <a href="#about" onClick={() => toggleMenu('about')}>Planes a futuro</a>
            <a href="#skills" onClick={() => toggleMenu('skills')}>Necesidad inmediata</a>
            <a href="#projects" onClick={() => toggleMenu('projects')}>Tipos de servicio</a>
            <a href="#contact" onClick={() => toggleMenu('contact')}>Contacto</a>
            <a href="#faq" onClick={() => toggleMenu('faq')}>Preguntas frecuentes</a>
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