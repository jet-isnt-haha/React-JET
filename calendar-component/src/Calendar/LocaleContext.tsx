import { createContext } from "react";

export interface LocaleContextType {
  locale: string;
}

const LocalContext = createContext<LocaleContextType>({
  locale: "zh-CN",
});

export default LocalContext;
