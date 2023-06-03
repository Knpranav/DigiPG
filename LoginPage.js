import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    // Check login credentials and navigate to home screen if successful
    if (username === 'admin' && password === 'password')
      navigation.navigate('Home');
    else
    console.log("Failed to login");
  };

  const handleRegister = () =>{
    navigation.navigate('RegisterPage');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View>
          <View style={{marginBottom:10}}>
              <Button style = {styles.button} title="Login" onPress={handleLogin}/>
          </View>
          <View style={{marginBottom:10}}>
              <Button style = {styles.button} title="Register" onPress={handleRegister}/>
          </View>
      </View>
  
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    color:'red',
    marginBottom:10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },

  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});
