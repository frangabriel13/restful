import React from "react";
import s from "./About.module.css";
import about from "../../assets/aboutImg.jpg";
import Mision from "./mision/Mision";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";
import { translations } from "../../components/translations"; // Importa las traducciones

const About = ({ language = 'en' }) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  const t = translations[language]; // Selecciona el idioma

  return (
    <div id="about" className={s.container}>
      <div className={s.about}>
        <div className={s.divTitle}>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div className={s.divData}>
          <div className={s.description}>
            <h3>{t.aboutHeading}</h3>
            <p>{t.aboutDescription}</p>
            <br />
            <br />
            <h1>{t.anticipate}</h1>
            <br />
            <br />
            <h1>{t.whyChooseUs}</h1>
            <br />
            <br />
            <p>{t.immediateNeed}</p>
            <br />
            <br />
            <h1>{t.whatWeDo}</h1>
            <br />
            <br />
            <p>{t.whatWeDoDescription}</p>
          </div>
          <div>
            <img src={about} alt="About" />
          </div>
        </div>
      </div>

      <div className={s.description}>
        <p>{t.coverage}</p>
      </div>

      <Mision language={language}/>

      <div className={s.callToAction}>
        <h3>{t.callToAction}</h3>
        <button onClick={handleContactClick}>{t.requestQuote}</button>
      </div>
    </div>
  );
};

export default About;
