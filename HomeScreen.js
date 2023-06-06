import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import { darkTheme, lightTheme, toggleTheme } from './Theme';
import loadFonts from './font';
import { LinearGradient } from 'expo-linear-gradient';
import { currentTheme } from './Theme';

export default function App({ navigation }){
  const { width } = Dimensions.get('window');
  const boxWidth = width / 2 * 0.95;
  const gridSize = Math.floor(width / 3) - 20; 
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


  return (
    <LinearGradient style={styles.container} colors={[theme.primaryColor, theme.secondaryColor]}>
    <ScrollView>
    <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
            <View style={styles.taskbar}>
                <Text style={{ fontFamily:'redMed', fontSize: 46, color:theme.textColor}}>DIGI PG</Text>
            </View>
        
            <View style={[styles.gridContainer]}>
                <View style={styles.row}>
                    <View style={[styles.gridbox, { width: boxWidth, backgroundColor:theme.boxColor  }]} />
                    <View style={[styles.gridbox, { width: boxWidth, backgroundColor:theme.boxColor  }]} />
              </View>
              <View style={styles.row}>
                  <View style={[styles.gridbox, { width: boxWidth, backgroundColor:theme.boxColor }]} />
                  <View style={[styles.gridbox, { width: boxWidth, backgroundColor:theme.boxColor }]} />
              </View>
            </View>

      </View>
      <View>
        <View style = {[styles.footer]}>
            <View style={[styles.box,{backgroundColor:theme.boxColor}]} />
            <View style={[styles.box,{backgroundColor:theme.boxColor}]} />
            <View style={[styles.box,{backgroundColor:theme.boxColor}]} />
        </View>
        
      </View>
    </SafeAreaView>
    </ScrollView>
  </LinearGradient>
  );
};


const styles = StyleSheet.create({
  footer:{
    flex:1,
    alignItems:'center'
  },
  gridContainer: {
    padding:3,
    alignItems: 'center',
  },
  taskbar: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  gridbox:{
    height: 150,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    alignItems:'center',
    height: 150,
    width:'80%',
    borderRadius: 0,
    backgroundColor: 'white',
    margin: 3,
  },
  title:{
    fontSize:58,
  }
});




