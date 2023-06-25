import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Switch, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import { lightTheme, toggleTheme } from './Theme';
import loadFonts from './font';
import CustomHeader from './CustomHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameTrim = username.trim().toLowerCase();
    const [isEnabled, setIsEnabled] = useState(false);
    const [theme, setTheme] = useState(lightTheme);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    useEffect(() => {
        async function loadAppFonts() {
            await loadFonts();
            setFontLoaded(true);
        }
          loadAppFonts();
    }, []);

    if (!isFontLoaded) {
        return null; // or render a loading screen
    }

    const handleToggleTheme = () => {
        setIsEnabled(previousState => !previousState)
        const newTheme = toggleTheme(theme);
        setTheme(newTheme);
    };

    const handleLogin = async () => {
        try {
          setInvalidCredentials(false);
          const existingRegistrations = await AsyncStorage.getItem('registrations');
          const registrations = existingRegistrations ? JSON.parse(existingRegistrations) : [];
    
          const matchedRegistration = registrations.find(registration => registration.username === username && registration.password === password);
    
          if (matchedRegistration) {
            if (matchedRegistration.firstLogin) {
              navigation.navigate('PG Details', {
                username: matchedRegistration.username
              });
            } else {
              navigation.navigate('Dashboard', {
                username: matchedRegistration.username
              });
            }
          } else {
            setInvalidCredentials(true);
          }
        } catch (error) {
          Alert.alert('Error', 'An error occurred while logging in');
        }
      };
    


    const handleRegister = () => {
        navigation.navigate('RegisterPage');
    };

    let path = '';
    if (theme === lightTheme) 
        path = require('../assets/Images/DigiPgLightLogo.png');
     else 
        path = require('../assets/Images/DigiPgDarkLogo.png');
    


    return (
        <LinearGradient style={styles.container} colors={[theme.primaryColor, theme.secondaryColor]}>         
            <Switch
                style={styles.switch}
                trackColor={{ false: '#010101', true: '#e39ff6' }}
                thumbColor={isEnabled ? '#A45ee5' : '#504A4B'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleToggleTheme}
                value={isEnabled}
            />

            <View style={styles.banner}>

                <Image
                    source={path}
                    style={styles.image}
                    resizeMode="cover"
                />

            </View>
    


    <View style={styles.formContent}>

        
        <Text style={[styles.inputLabel, { fontFamily: 'redMed', letterSpacing: 2, backgroundColor: theme.primaryColor,color: theme.textColor,textShadowColor:theme.textShadowColor }]}>ENTER USERNAME</Text>

                <TextInput
                    style={[styles.input, { borderColor: theme.headlines, color: theme.textColor }]}
                    placeholder="PG - ID"
                    placeholderTextColor={theme.placeholder}
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <Text style={[styles.inputLabel,  invalidCredentials && styles.inputError, { fontFamily: 'redMed', letterSpacing: 2, backgroundColor: theme.primaryColor,color: theme.textColor, textShadowColor:theme.textShadowColor }]}>ENTER PASSWORD</Text>

                <TextInput
                    style={[styles.input,invalidCredentials && styles.inputError,{ borderColor: theme.headlines, color: theme.textColor }]}
                    placeholder="Password"
                    placeholderTextColor={theme.placeholder}
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
      {invalidCredentials && (
        <Text style={styles.errorText}>Invalid credentials. Please try again.</Text>
      )}
                <TouchableOpacity style={[styles.buttonLogin, { marginBottom: 10 }]} onPress={handleLogin}>
                    <Text style={[styles.buttonText, { color: theme.textColor, fontFamily: 'redMed' }]}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonRegister]} onPress={handleRegister}>
                    <Text style={[styles.buttonText, { color: theme.textColor, fontFamily: 'redMed' }]}>REGISTER</Text>
                </TouchableOpacity>

                <View>
                </View>
            </View>
            
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    switchContainer: {
        position: 'absolute',
        backgroundColor:'green',
        right: 10,
        top: 30
    },
    switch: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1
    },

    image: {
        margin: 50,
        width: 150,
        height: 150,
        borderRadius: 100, // half of the width and height
    },

    inputLabel: {
        textAlign: "left",
        width: '80%',
        padding: 7,
        fontSize: 14,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        fontFamily: 'redLight',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 5,
    },

    formContent: {
        flex: 3,
        width: '100%',
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    banner: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 20,
        height: 40,
        width: 120,
        backgroundColor: 'rgb(227, 159, 246)',
        textShadowColor: 'rgba(255, 255, 255, 0.9)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 5
    },
    buttonRegister: {
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderColor: '#e39ff6',
        borderWidth: 1,
        marginTop: 10,
        justifyContent: 'center',
        width: 120,
        height: 40,
        backgroundColor: 'transparent'
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 15,
    },

    container: {
        flex: 1,
        fontFamily: 'redLight',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    title: {
        fontSize: 44,
        marginBottom: 16,
        textAlign: 'center',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 5
    },

    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderTopWidth: 0,
        letterSpacing: 1
    },
});
