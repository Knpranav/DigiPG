import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from 'react-native-async-storage/async-storage';

const OnboardDetailsPage = ({ route }) => {
  const { username, currentOccupancy, maxOccupancy, onOnboard } = route.params;
  const [selectedRoom, setSelectedRoom] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleOnboard = () => {
    onOnboard(selectedRoom, customerName);
  };

  return (
    <View>
      <Text>Select a Room:</Text>
      <Picker
        selectedValue={selectedRoom}
        onValueChange={(itemValue) => setSelectedRoom(itemValue)}
      >
        <Picker.Item label="Room 1" value="room1" />
        <Picker.Item label="Room 2" value="room2" />
        {/* Add more Picker.Item components for each available room */}
      </Picker>

      <Text>Customer Name:</Text>
      <TextInput
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
        placeholder="Enter customer name"
      />

      <TouchableOpacity onPress={handleOnboard}>
        <Text>Onboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardDetailsPage;
