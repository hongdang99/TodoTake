import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {themes, ThemeContext} from "./context/ThemeContext";

const hocCreator = WrappedComponent => {
    return class NameClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                theme: themes.light
            };
        }

        toggleTheme = () => {
          this.setState((state) => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark
          }));
        };

        render() {
            return(
                <ThemeContext.Provider
                    value={{
                    theme: this.state.theme,
                    toggleTheme: this.toggleTheme
                }}>
                    <WrappedComponent {...this.props} {...this.state} />
                </ThemeContext.Provider>
            );
        }
    }
};
const HOCCreator = hocCreator(App)
ReactDOM.render(
  <HOCCreator />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
