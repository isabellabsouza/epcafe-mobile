import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      // <Stack screenOptions={{headerShown:false}}>
      //   <Stack.Screen name="index"/>
      //   <Stack.Screen name="login" />
      //   <Stack.Screen name="restricted" />
      //   <Stack.Screen name="+not-found" />
      // </Stack>
      <SafeAreaView style={{ flex: 1, padding:17 }}> 
            <Slot />
        </SafeAreaView>
        
    //</ThemeProvider>
  );
}
