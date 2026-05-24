import { createContext, useContext, useState } from "react";

// src/i18n/translations.ts
import en from "../assets/translations/english.json";
import es from "../assets/translations/spanish.json";
import jp from "../assets/translations/japanese.json";

export const translations = { en, es, jp };
export type Language = keyof typeof translations;
export type Translations = typeof en; // the shape of your JSON

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  lang: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Traverses the nested object using a dot path like "OurStory.ourStory.title"
function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const lang = (path: string): string => {
    return getNestedValue(translations[language], path);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
