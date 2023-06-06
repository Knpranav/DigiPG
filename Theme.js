import { createContext } from 'react';

export const ThemeContext = createContext();

export const darkTheme = {

  textColor: 'white',
  primaryColor: '#4B0082',
  headlines: '#A45ee5',
  secondaryColor:'#0C090A',
  sidelines:'#B6B6B4',
  placeholder:'#A9A9A9',
  boxColor:'#555555',
  imgPath:"./assets/Images/DigiLight.png",
  textShadowColor: 'rgba(255, 255, 255, 0.9)'
  // Add more styles for other components as needed
};

export const lightTheme = {

  textColor: '#504A4B',
  primaryColor: '#B6B6B4',
  secondaryColor:'#F5F5F5',
  boxColor:'rgb(227, 159, 246)',
  headlines:'#B6B6B4',
  sidelines:'#66606D',
  placeholder:'#504A4B',
  imgPath:'./assets/Images/DigiPgLogo.png',
  textShadowColor: 'rgba(0, 0, 0, 0.3)'
  // Add more styles for other components as needed
};

let themeSet = lightTheme
export const toggleTheme = (currentTheme) => {
  themeSet = (currentTheme === darkTheme ? lightTheme : darkTheme);
  return themeSet
};
export const currentTheme = () => {
  return themeSet
};
