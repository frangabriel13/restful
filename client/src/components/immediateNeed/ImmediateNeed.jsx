import React from "react";
import s from "./ImmediateNeed.module.css";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";
import { translations } from "../../components/translations";
import step1 from "../../assets/steps/1.png";
import step2 from "../../assets/steps/2.png";
import step3 from "../../assets/steps/3.png";
import step4 from "../../assets/steps/4.png";
import step5 from "../../assets/steps/5.png";
import step6 from "../../assets/steps/6.png";

const ImmediateNeed = ({ language }) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  const t = translations[language];

  const steps = [
    { title: t.immediateNeedStep1Title, description: t.immediateNeedStep1Description, image: step1 },
    { title: t.immediateNeedStep2Title, description: t.immediateNeedStep2Description, image: step2 },
    { title: t.immediateNeedStep3Title, description: t.immediateNeedStep3Description, image: step3 },
    { title: t.immediateNeedStep4Title, description: t.immediateNeedStep4Description, image: step4 },
    { title: t.immediateNeedStep5Title, description: t.immediateNeedStep5Description, image: step5 },
    { title: t.immediateNeedStep6Title, description: t.immediateNeedStep6Description, image: step6 },
  ];

  return (
    <div id="immediate-need" className={s.container}>
      <div className={s.divTitle}>
        <h2>{t.immediateNeedTitle}</h2>
      </div>
      <div className={s.description}>
        <h3>{t.immediateNeedSubtitle}</h3>
        <p>{t.immediateNeedDescription}</p>
      </div>
      <div className={s.divSteps}>
        <h4>{t.immediateNeedStepsTitle}</h4>
        {/* <div className={s.step}>
          <h5>{t.immediateNeedStep1Title}</h5>
          <p>{t.immediateNeedStep1Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep2Title}</h5>
          <p>{t.immediateNeedStep2Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep3Title}</h5>
          <p>{t.immediateNeedStep3Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep4Title}</h5>
          <p>{t.immediateNeedStep4Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep5Title}</h5>
          <p>{t.immediateNeedStep5Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep6Title}</h5>
          <p>{t.immediateNeedStep6Description}</p>
        </div> */}
        {steps.map((step, index) => (
          <div className={`${s.step} ${index % 2 === 0 ? s.leftToRight : s.rightToLeft}`} key={index}>
            <img src={step.image} alt={`Step ${index + 1}`} className={s.stepImage} />
            <div>
              <h5>{step.title}</h5>
              <p className={s.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={s.callToAction}>
        <h3>{t.immediateNeedCallToAction}</h3>
        <button onClick={handleContactClick}>{t.futurePlanningButton}</button>
      </div>
    </div>
  );
};

export default ImmediateNeed;
