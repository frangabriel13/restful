import React, { useState, useEffect, useRef } from "react";
import s from "./Header.module.css";
import { IoMdMenu, IoMdClose } from "react-icons/io";  // Importamos el ícono de cierre
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { scrollToSection } from "../../utils/utilities";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null); // Ref para el menú

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

  const toggleMenu = (sectionId) => {
    setMenuOpen(!menuOpen);

    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  // Nueva función que no afecta el estado del menú, solo navega a la página de inicio
  const goToHome = () => {
    scrollToSection('home');
  };

  // Cerrar el menú si hacen clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Cerrar el menú
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={`${s.container} ${isScrolled ? s.scrolled : ""}`}>
      <div>
        {/* El logo ahora solo navega a la página de inicio sin afectar el estado del menú */}
        <Link to="/" onClick={goToHome} className={s.logo}>
          <img src={logo} alt="logo" className={s.logo} />
        </Link>
      </div>
      <div className={s.divNav} ref={menuRef}>
        <nav className={`${s.navbar} ${menuOpen ? s.open : ''}`}>
          <Link to="/about" onClick={() => toggleMenu('about')}>Quiénes somos</Link>
          <Link to="/future-planning" onClick={() => toggleMenu('future-planning')}>Planes a futuro</Link>
          <Link to="/immediate-need" onClick={() => toggleMenu('immediate-need')}>Necesidad inmediata</Link>
          <Link to="/services" onClick={() => toggleMenu('services')}>Tipos de servicio</Link>
          <Link to="/contact" onClick={() => toggleMenu('contact')}>Contacto</Link>
          <Link to="/mourning" onClick={() => toggleMenu('mourning')}>Duelo</Link>
          <Link to="/contact" onClick={() => toggleMenu('contact')}>
            <button className={s.btnQuote}>Solicitar Presupuesto</button>
          </Link>
        </nav>
      </div>
      <div className={s.navToggle}>
        {/* Alternar entre el ícono de hamburguesa y el ícono de cierre */}
        {menuOpen ? (
          <IoMdClose className={s.btnMenu} onClick={() => toggleMenu()} />
        ) : (
          <IoMdMenu className={s.btnMenu} onClick={() => toggleMenu()} />
        )}
      </div>
    </div>
  );
}

export default Header;
