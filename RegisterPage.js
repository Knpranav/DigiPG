import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { currentTheme } from './Theme';

const RegisterPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState(currentTheme);
  //var theme = useState(currentTheme)
  const handleRegister = () => {
    // Perform registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.page}>
        <LinearGradient colors={['#ff512f', '#dd2476']} style={styles.titleContainer}>
            <Text style={[styles.title,{ color: theme.textColor }]}>Register Here</Text>
        </LinearGradient>

      <View style={[styles.container,{ backgroundColor:theme.primaryColor}]}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Register" 
        style = {[styles.Register,{width:10}]}
        onPress={handleRegister} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 2,
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default RegisterPage;
