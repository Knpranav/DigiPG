import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from './CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { currentTheme, lightTheme } from './Theme';

export default function AdditionalDetailsPage({ route }) {
  const { username } = route.params;
  const navigation = useNavigation();
  const [pgName, setPgName] = useState('');
  const [pgAddress, setPgAddress] = useState('');
  const [pgOwnerName, setPgOwnerName] = useState('');
  const [pgPhoneNumber, setPgPhoneNumber] = useState('');
  const [theme, setTheme] = useState(lightTheme);


  useEffect(() => {
    async function loadAppFonts() {
        await loadFonts();
        setFontLoaded(true);
    }
      loadAppFonts();
}, []);


  const handleSaveDetails = async () => {
    try {
      const existingRegistrations = await AsyncStorage.getItem('registrations');
      const registrations = existingRegistrations ? JSON.parse(existingRegistrations) : [];

      const updatedRegistrations = registrations.map(registration => {
        if (registration.username === username) {
          return {
            ...registration,
            pgName,
            pgAddress,
            pgOwnerName,
            pgPhoneNumber,
            firstLogin: false
          };
        }
        return registration;
      });

      await AsyncStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
      navigation.navigate('Dashboard', {
        username: username
      });
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving additional details');
    }
  };

  return (
  <><CustomHeader  pageTitle={"Additional Information"}/>
  <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="PG Name"
        placeholderTextColor="#aaa"
        onChangeText={text => setPgName(text)}
        value={pgName} />
      <TextInput
        style={styles.input}
        placeholder="PG Address"
        placeholderTextColor="#aaa"
        onChangeText={text => setPgAddress(text)}
        value={pgAddress} />
      <TextInput
        style={styles.input}
        placeholder="PG Owner Name"
        placeholderTextColor="#aaa"
        onChangeText={text => setPgOwnerName(text)}
        value={pgOwnerName} />
      <TextInput
        style={styles.input}
        placeholder="PG Phone Number"
        placeholderTextColor="#aaa"
        onChangeText={text => setPgPhoneNumber(text)}
        value={pgPhoneNumber} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveDetails}>
        <Text style={styles.saveButtonText}>Go To DashBoard</Text>
      </TouchableOpacity>
    </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft:20,
    paddingRight:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width:200,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
