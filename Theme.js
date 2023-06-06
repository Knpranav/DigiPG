import { createContext } from 'react';

export const ThemeContext = createContext();

export const darkTheme = {

  textColor: 'white',
  primaryColor: '#4B0082',
  secondaryColor: '#A45ee5',
  headlines:'#0C090A',
  sidelines:'#B6B6B4',
  placeholder:'#A9A9A9',
  imgPath:"./assets/Images/DigiLight.png"

  // Add more styles for other components as needed
};

export const lightTheme = {

  textColor: 'black',
  primaryColor: '#A45ee5',
  secondaryColor: 'white',
  headlines:'white',
  sidelines:'#A9A9A9',
  placeholder:'#504A4B',
  imgPath:'./assets/Images/DigiPgLogo.png'
  // Add more styles for other components as needed
};

var themeSet = darkTheme
export const toggleTheme = (currentTheme) => {
  themeSet = (currentTheme === darkTheme ? lightTheme : darkTheme);
  return themeSet
};
export const currentTheme = () => {
  return themeSet
};
