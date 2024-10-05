import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const loadDatabase = async () => {
  const dbName = "test.db";
  const dbAsset = require("../data/test.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}SQLite`,
          { intermediates: true}
      );
      await FileSystem.downloadAsync(dbUri, dbFilePath)
  }
}

export default function RootLayout() {

  const [dbLoaded, setDbLoaded] = useState<boolean>(false)

  useEffect(() => {
      loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e))
  }, []) 

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Valorant: require('../assets/fonts/Valorant Font.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
      <RootLayoutNav />
    
  );
}

function RootLayoutNav() {
  return (
    <SQLiteProvider databaseName='test.db'>
      
      <ThemeProvider value={DarkTheme}>
        {/* <SafeAreaView style={styles.safeArea}> */}
        <Stack>
          <Stack.Screen name="index" options={{headerShown: true, headerTitle: "SELECT MAP", headerTitleAlign: "center" , headerTitleStyle:{fontFamily: "Valorant"},}}/>
          <Stack.Screen name="[map]/index" options={{headerShown: true, headerTitle: "SELECT AGENT", headerTitleAlign: "center" , headerTitleStyle:{fontFamily: "Valorant"}}}/>
          <Stack.Screen name="[map]/[agent]/index" options={{headerShown: true, headerTitle: "SELECT UTILITY", headerTitleAlign: "center" , headerTitleStyle:{fontFamily: "Valorant"}}}/>
          <Stack.Screen name="[map]/[agent]/[utility]/index" options={{headerShown: true, headerTitle: "We are Valorant", headerTitleAlign: "center" , headerTitleStyle:{fontFamily: "Valorant"} }}/>
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        {/* </SafeAreaView> */}
      </ThemeProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})