import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en";
import he from "./translations/he";

const resources = {
  en: { translation: { ...en } },
  he: { translation: { ...he } },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  keySeparator: '.',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
