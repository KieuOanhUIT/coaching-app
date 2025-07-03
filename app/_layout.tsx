import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { UserDetailContext } from './../context/UserDetailContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [userDetail, setUserDetail] = useState(null);

  // Su dung font chu khac
  // const [loaded, error] = useFonts({
  //   'outfit': require('./../assets/fonts/<ten file ttf'),
  //   'outfit-bold': require('./../assets/fonts/<ten file tff bold')
  // })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="+not-found" />
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <Stack screenOptions={{
        headerShown: false
      }}/>
    </UserDetailContext.Provider>
  );
}
