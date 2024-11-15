import React, { useState, useEffect, useRef } from "react";
import s from "./Header.module.css";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/principal.png";
import { scrollToSection } from "../../utils/utilities";

function Header({ language, setLanguage }) { // Recibe el idioma como prop

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

  // Función para cambiar el idioma
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const texts = {
    es: {
      about: "Quiénes somos",
      futurePlanning: "Planes a futuro",
      immediateNeed: "Necesidad inmediata",
      services: "Tipos de servicio",
      contact: "Contacto",
      mourning: "Duelo",
      requestQuote: "Solicitar Presupuesto",
      spanish: "Español",
      english: "English"
    },
    en: {
      about: "About Us",
      futurePlanning: "Future Planning",
      immediateNeed: "Pre-Need",
      services: "Services",
      contact: "Contact",
      mourning: "Mourning",
      requestQuote: "Request Quote",
      spanish: "Spanish",
      english: "English"
    }
  };

  const currentTexts = texts[language];

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
          {/* <Link to="/about" onClick={() => toggleMenu('about')}>Quiénes somos</Link>
          <Link to="/future-planning" onClick={() => toggleMenu('future-planning')}>Planes a futuro</Link>
          <Link to="/immediate-need" onClick={() => toggleMenu('immediate-need')}>Necesidad inmediata</Link>
          <Link to="/services" onClick={() => toggleMenu('services')}>Tipos de servicio</Link>
          <Link to="/contact" onClick={() => toggleMenu('contact')}>Contacto</Link>
          <Link to="/mourning" onClick={() => toggleMenu('mourning')}>Duelo</Link>
          <Link to="/contact" onClick={() => toggleMenu('contact')}>
            <button className={s.btnQuote}>Solicitar Presupuesto</button>
          </Link> */}
          <Link to="/about" onClick={() => toggleMenu('about')}>{currentTexts.about}</Link>
          <Link to="/future-planning" onClick={() => toggleMenu('future-planning')}>{currentTexts.futurePlanning}</Link>
          <Link to="/immediate-need" onClick={() => toggleMenu('immediate-need')}>{currentTexts.immediateNeed}</Link>
          <Link to="/services" onClick={() => toggleMenu('services')}>{currentTexts.services}</Link>
          <Link to="/contact" onClick={() => toggleMenu('contact')}>{currentTexts.contact}</Link>
          <Link to="/mourning" onClick={() => toggleMenu('mourning')}>{currentTexts.mourning}</Link>
          <Link to="/contact" onClick={() => toggleMenu('contact')}>
            <button className={s.btnQuote}>{currentTexts.requestQuote}</button>
          </Link>

          {/* Selección de idioma */}
          <div className={s.languageSwitcher}>
            <button 
              className={`${s.languageButton} ${language === 'es' ? s.active : ''}`}
              onClick={() => handleLanguageChange('es')}
            >
              Es
            </button>
            <button 
              className={`${s.languageButtonEn} ${language === 'en' ? s.active : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              En
            </button>
          </div>
          {/* <div className={s.divPhone}>
            <p>+1 323 551 7579</p>
          </div> */}
          <div className={s.divPhone}>
            <a href="https://wa.me/13235517579" target="_blank" rel="noopener noreferrer">
              <p>+1 323 551 7579</p>
            </a>
          </div>
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

