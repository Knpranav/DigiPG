import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from './CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { currentTheme } from './Theme';
import LoginPage from './LoginPage';
import { sendSMS } from './SMSModule';

import loadFonts from './font'

const RegisterPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [lastAddedUsername, setLastAddedUsername] = useState('');
  const [theme, setTheme] = useState(currentTheme);
  const [isFontLoaded, setFontLoaded] = useState(false);

  const generateOtp = () => {
    // Perform any necessary validation or checks before sending the SMS
  
    // Call the sendSMS function
    sendSMS(phoneNumber, 'Your OTP is: 123456'); // Replace '123456' with your generated OTP value
  };
  // useEffect(() => {
  //   async function loadAppFonts() {
  //     await loadFonts();
  //     setFontLoaded(true);
  //   }

  //   loadAppFonts();
  // }, []);

  useEffect(() => {
    generateUsername();
  }, []);

  // if (!isFontLoaded) {
  //   return null; // or render a loading screen
  // }



  const generateUsername = async () => {
    try {
      const existingRegistrations = await AsyncStorage.getItem('registrations');
      const registrations = existingRegistrations ? JSON.parse(existingRegistrations) : [];
      const count = registrations.length;
      const generatedUsername = `PG-${(count + 1).toString().padStart(3, '0')}`;
      setUsername(generatedUsername);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while generating username');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setPasswordValid(false);
      return;
    }

    try {
      const existingRegistrations = await AsyncStorage.getItem('registrations');
      const registrations = existingRegistrations ? JSON.parse(existingRegistrations) : [];

      const usernameExists = registrations.some(registration => registration.username === username);

      if (usernameExists) {
        setUsernameExists(true);
        return;
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while checking the username');
      return;
    }

    const registrationData = {
      username,
      password,
      phoneNumber,
      firstLogin: true
    };

    try {
      const existingRegistrations = await AsyncStorage.getItem('registrations');
      const registrations = existingRegistrations ? JSON.parse(existingRegistrations) : [];

      registrations.push(registrationData);

      await AsyncStorage.setItem('registrations', JSON.stringify(registrations));

      setLastAddedUsername(username);
      setRegistrationSuccess(true);
      generateUsername();
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('LoginPage');
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    }
  };

  return (
    <LinearGradient style={styles.container} colors={[theme.primaryColor, theme.secondaryColor]}>
    <CustomHeader pageTitle="Register Page" textColor = {theme.textColor}/>
    <View style={[styles.page]}>
      {registrationSuccess && (
        <View style={styles.successContainer}>
          <Text style={[styles.successText,{fontFamily:'redMed'}]}>{lastAddedUsername} - Registration successful</Text>
        </View>
      )}
      {!passwordValid && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText,{fontFamily:'redMed'}]}>Password too short</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="PG - ID"
        color = {theme.textColor}
        placeholderTextColor="#fff"
        borderColor = {theme.sidelines}
        onChangeText={text => {
          setUsername(text);
          setUsernameExists(false);
        } }
        value={username}
        readOnly />
      {usernameExists && (
        <Text style={styles.errorText}>Username already exists</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password > 8 Chars"
        color = {theme.textColor}
        borderColor = {theme.sidelines}
        placeholderTextColor = {theme.placeholder}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        color = {theme.textColor}
        placeholderTextColor= {theme.placeholder}
        borderColor = {theme.sidelines}
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry />

        <TextInput
        style={styles.input}
        placeholder="PhoneNumber"
        color = {theme.textColor}
        placeholderTextColor= {theme.placeholder}
        borderColor = {theme.sidelines}
        onChangeText={Number => setPhoneNumber(Number)}
        value={phoneNumber}
         />
      
      <TouchableOpacity style={[styles.registerButton,{fontFamily:'redLight'}]} onPress={generateOtp}>
        <Text style={[styles.registerButtonText,{fontFamily:'redLight'}]}>Generete OTP</Text>
      </TouchableOpacity>


    <View style ={[styles.buttonContainer]}> 
      <TouchableOpacity style={[styles.registerButton,{fontFamily:'redLight'}]} onPress={handleRegister}>
        <Text style={[styles.registerButtonText,{fontFamily:'redLight'}]}>Register</Text>
      </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
 );

}
const styles = StyleSheet.create({
  buttonContainer:{
      height:100,
      justifyContent:"center",
      alignItems:"center",
  },
  page:{
    flex:1,
    padding:20,
    height:400
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  registerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderBottomWidth:2,
    borderRadius: 0,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 40,
    width: 120,
    backgroundColor: 'rgb(227, 159, 246)',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 5
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  successText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },

});


export default RegisterPage;


