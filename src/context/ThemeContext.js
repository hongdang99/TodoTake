import React from "react";
const themes = {
  light: {

    background: "#eeeeee",
    button: "blue"
  },
  dark: {
    background: "#222222",
    button: "red"
  }
};
const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
});

export {
    ThemeContext,
    themes,
};