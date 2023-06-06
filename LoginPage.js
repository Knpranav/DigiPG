import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Image, Platform } from 'react-native';
import { darkTheme, lightTheme, toggleTheme } from './Theme';
import loadFonts from './font';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameTrim = username.trim().toLowerCase();
    const [isEnabled, setIsEnabled] = useState(false);
    const [theme, setTheme] = useState(lightTheme);
    const [isFontLoaded, setFontLoaded] = useState(false);

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

    const handleLogin = () => {
        // Perform login logic here
        console.log('Username:', username);
        console.log('Password:', password);

        // Check login credentials and navigate to home screen if successful
        if (usernameTrim === 'admin' && password === 'password') {
            navigation.navigate('Home');
        } else {
            console.log('Failed to login');
        }
    };

    const handleRegister = () => {
        navigation.navigate('RegisterPage');
    };

    let path = '';
    if (theme === lightTheme) {
        path = require('./assets/Images/DigiLight.png');
    } else {
        path = require('./assets/Images/DigiPgLogo.png');
    }


    return (
        <LinearGradient style={styles.container} colors={[theme.primaryColor, theme.headlines]}>
            <View></View>
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
                <Text style={[styles.inputLabel, { fontFamily: 'redLight', letterSpacing: 2, backgroundColor: theme.primaryColor }]}>ENTER USERNAME</Text>
                <TextInput
                    style={[styles.input, { borderColor: theme.secondaryColor, color: theme.textColor }]}
                    placeholder="Username"
                    placeholderTextColor={theme.placeholder}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text style={[styles.inputLabel, { fontFamily: 'redLight', letterSpacing: 2, backgroundColor: theme.primaryColor }]}>ENTER PASSWORD</Text>
                <TextInput
                    style={[styles.input, { borderColor: theme.secondaryColor, color: theme.textColor }]}
                    placeholder="Password"
                    placeholderTextColor={theme.placeholder}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

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
        marginTop: 100,
        width: 200,
        height: 200,
        borderRadius: 100, // half of the width and height
        elevation: 40
    },

    inputLabel: {
        textAlign: "left",
        color: 'white',
        width: '80%',
        padding: 7,
        fontSize: 14,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        fontFamily: 'redLight',
        textShadowColor: 'rgba(255, 255, 255, 0.9)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 5,
    },

    formContent: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    banner: {
        flex: 1,
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
