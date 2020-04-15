import { createContext } from "react";

const ThemeContext = createContext(localStorage.getItem("theme") || "light");

export default ThemeContext;
