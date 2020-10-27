import React, { useState } from "react";
import i18n from "i18next";

import cn from "classnames";
import "./Header.scss";

const Header = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="header">
      <div className="slider">
        <div className={cn("sliderBack", currentLang === "he" && "right")} />
        <button
          type="button"
          className={currentLang === "en" ? "activeLang" : null}
          onClick={() => {
            setCurrentLang("en");
            changeLanguage("en");
          }}
        >
          EN
        </button>
        <button
          type="button"
          className={currentLang === "he" ? "activeLang" : null}
          onClick={() => {
            setCurrentLang("he");
            changeLanguage("he");
          }}
        >
          HE
        </button>
      </div>
      <div className="logo">
        <h3>{"{...}"}</h3>
      </div>
    </div>
  );
};

export default Header;
