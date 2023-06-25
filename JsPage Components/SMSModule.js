import { NativeModules } from 'react-native';

const { SMSModule } = NativeModules;

export function sendSMS(phoneNumber, message) {
  SMSModule.sendSMS(phoneNumber, message);
}