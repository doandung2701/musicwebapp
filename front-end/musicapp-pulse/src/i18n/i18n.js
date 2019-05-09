import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import gb from './locale/en.json';
import vn from './locale/vi.json';
import cn from './locale/cn.json';
import jp from './locale/jp.json';

i18n.use(initReactI18next).use(LanguageDetector)
.init({
    resources: {
        gb,
        vn,
        cn,
        jp
    },
    fallbackLng: localStorage.getItem('lang')?localStorage.getItem('lang'):"vn",
    debug: true,
    ns: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },
    react: {
        wait: true
    },
});

export default i18n;
