import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Image,} from 'react-native';
import { darkTheme, lightTheme, toggleTheme } from './Theme';
import loadFonts from './font';
import { LinearGradient } from 'expo-linear-gradient';
import { currentTheme } from './Theme';



const RegisterPage = ({ navigation }) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState(currentTheme);
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
  //var theme = useState(currentTheme)
  const handleRegister = () => {
    // Perform registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <LinearGradient style={styles.container} colors={[theme.primaryColor, theme.secondaryColor]}>
    <View style={styles.page}>
        <View style={styles.titleContainer}>
            <Text style={[styles.title,{ color: theme.textColor, fontFamily:'redMed' }]}>Register Here</Text>
        </View>

      <View style={styles.container}>
      <Text style={[styles.inputLabel, { fontFamily: 'redLight', color: theme.textColor, letterSpacing: 2, backgroundColor: theme.headlines, textShadowColor:theme.textShadowColor}]}>ENTER YOUR PG NAME</Text>
        <TextInput
            style={[styles.input, { borderColor: theme.sidelines, color: theme.textColor }]}
            placeholder="PG Name"
            placeholderTextColor={theme.placeholder}
            onChangeText={(text) => setName(text)}
        />
         <Text style={[styles.inputLabel,{ fontFamily: 'redLight', color: theme.textColor, letterSpacing: 2, backgroundColor: theme.headlines, textShadowColor:theme.textShadowColor }]}>ENTER YOUR EMAIL</Text>
        <TextInput
            style={[styles.input, { borderColor: theme.sidelines, color: theme.textColor }]}
            placeholder="Email"
            placeholderTextColor={theme.placeholder}
            onChangeText={(text) => setEmail(text)}
        />
         <Text style={[styles.inputLabel, { fontFamily: 'redLight',color: theme.textColor, letterSpacing: 2, backgroundColor: theme.headlines, textShadowColor:theme.textShadowColor }]}>ENTER A PASSWORD</Text>
        <TextInput
            style={[styles.input, { borderColor: theme.sidelines, color: theme.textColor }]}
            placeholder="Password"
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
          <TextInput
            style={[styles.input, { borderColor: theme.sidelines, color: theme.textColor }]}
            placeholder="Re - Enter Password"
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        
       <TouchableOpacity style={[styles.buttonLogin, { marginBottom: 10 }]}>
            <Text style={[styles.buttonText, { color: theme.textColor, fontFamily: 'redMed' }]}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({

  
  inputLabel: {
    textAlign: "left",
    color: 'white',
    width: '80%',
    padding: 7,
    fontSize: 14,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    fontFamily: 'redLight',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 5,
},

  page: {
    flex: 1,
    width:'100%',
    flexDirection: 'column',
  },

  titleContainer: {
    flex: 2,
    justifyContent: 'center',
  },

  title: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },

  container: {
    flex: 3,
    alignItems:'center',
  },

  input: {
    width: '80%',
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 10,
    letterSpacing: 1,
    borderBottomWidth:1,    
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

buttonText: {
  textAlign: 'center',
  fontSize: 15,
},

});

export default RegisterPage;
