// font.js
import * as Font from 'expo-font';

export default async function loadFonts() {
  await Font.loadAsync({
    'work-sans-100': require('./assets/fonts/WorkSans-Light.ttf'),
    'work-sans-300': require('./assets/fonts/WorkSans-Regular.ttf'),
    'work-sans-500': require('./assets/fonts/WorkSans-Medium.ttf'),
  });
}
