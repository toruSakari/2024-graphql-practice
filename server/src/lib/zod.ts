// import i18next from "i18next";
import { z } from "zod";
/**
 * @see https://stackoverflow.com/questions/76912272/why-is-the-zod-error-message-undefined-when-using-zod-i18n-in-server-side-code
 */
import { zodI18nMap } from "zod-i18n-map/dist/index.mjs";
// import esTranslation from "zod-i18n-map/locales/es/zod.json";
// import jaTranslation from "zod-i18n-map/locales/ja/zod.json";
// import { LOCALE } from '@/config'

// i18next.init({
//   lng: LOCALE,
//   resources: {
//     es: { zod: esTranslation },
//     ja: { zod: jaTranslation },
//   }
// });

z.setErrorMap(zodI18nMap);

export { z }
