import React, { Component } from "react";
import { themes, ThemeContext } from "../context/ThemeContext";
export default class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // theme: themes.light
    };
  }
  // toggleTheme = () => {
  //   this.setState((state) => ({
  //     theme: state.theme === themes.dark ? themes.light : themes.dark
  //   }));
  // };

  render() {
      // console.log('this.props', this.props);
    return (
        <ThemeContext.Provider
          value={{
            // theme: this.state.theme,
            // toggleTheme: this.toggleTheme
          }}
        >
          {/*{this.props.children}*/}
        </ThemeContext.Provider>
    );
  }
}
