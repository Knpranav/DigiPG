import {React,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardPage from './JsPage Components/DashboardPage';
import LoginPage from './JsPage Components/LoginPage';
import RegisterPage from './JsPage Components/RegisterPage';
import PGLayout from './JsPage Components/PGLayout';
import AdditionalDetailsPage from './JsPage Components/AdditionalDetailsPage'
import { ThemeContext, darkTheme, lightTheme } from './JsPage Components/Theme';

const Stack = createStackNavigator();


export default function App() {

  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };
  
  const Stack = createStackNavigator();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
          header: () => <CustomHeader />, // Set the custom header component
        }}
      >
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardPage"
          component={DashboardPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PG Details" 
          component={AdditionalDetailsPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardPage} 
          options={{ headerShown: false }} 
          />
        <Stack.Screen 
          name="PGLayout" 
          component={PGLayout} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
  );
}
