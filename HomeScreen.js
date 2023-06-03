import React,{useEffect, useState }from 'react';
import { View, StyleSheet,ScrollView, Text, SafeAreaView, Dimensions } from 'react-native';
import * as Font from 'expo-font'
import loadFonts from './font';

export default function App({ navigation }){
  const { width } = Dimensions.get('window');
  const boxWidth = width / 2 * 0.95;
  const gridSize = Math.floor(width / 3) - 20; 

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
    <ScrollView>
    <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
            <View style={styles.taskbar}>
                <Text style={{ fontFamily: 'work-sans-100', fontSize: 46 }}>DIGI PG</Text>
            </View>

            <View style={styles.gridContainer}>
                <View style={styles.row}>
                    <View style={[styles.box, { width: boxWidth }]} />
                    <View style={[styles.box, { width: boxWidth }]} />
              </View>
              <View style={styles.row}>
                  <View style={[styles.box, { width: boxWidth }]} />
                  <View style={[styles.box, { width: boxWidth }]} />
              </View>
            </View>

      </View>
      <View>
        <View style = {styles.footer}>
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  gridContainer: {
    padding:3,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  taskbar: {
    height: 250,
    backgroundColor:'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    height: 150,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 3,
  },
  title:{
    fontSize:58,
  }
});




