import i18next from "i18next";
import * as resources from "@/conf/lang";
import { LOCALE } from '@/config'

export const i18nextInit = () => {
  i18next.init({
    lng: LOCALE,
    resources,
  });
}
