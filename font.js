// font.js
import * as Font from 'expo-font';

export default async function loadFonts() {
  await Font.loadAsync({
    'redLight': require('./assets/fonts/RedHatDisplay-Light.ttf'),
    'redMed': require('./assets/fonts/RedHatDisplay-Medium.ttf'),
    'redBold': require('./assets/fonts/RedHatDisplay-Regular.ttf'),
  });
}
