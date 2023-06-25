import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Switch, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import { lightTheme, toggleTheme,currentTheme } from './Theme';
import loadFonts from './font';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function CustomHeader({pageTitle, textColor, fontFamily}) {

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
  
  return (
    <View style={{ 
    flexDirection: 'row',
    paddingLeft:20,paddingBottom:5,
    paddingTop:5, alignItems: 'center',
    backgroundColor:currentTheme.primaryColor,
    marginTop:40
    }}>
        <View>
            <Image
              source={require('../assets/Images/DigiPgDarkLogo.png')}
              style={{ width: 70, height: 70, marginRight: 10, borderRadius:100 }}
            />
        </View>
        <View>
            <Text style={{ fontSize: 18, fontWeight:'bold', color:textColor,fontFamily:fontFamily }}>{pageTitle}</Text>
        </View>
    </View>
  );
}

export default CustomHeader;
