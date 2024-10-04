import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';

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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SQLiteProvider databaseName='test.db'>
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="index" options={{headerTitle: "Select Map"}}/>
          <Stack.Screen name="[map]/index" options={{headerTitle: "Select Agent"}}/>
          <Stack.Screen name="[map]/[agent]/index" options={{ headerTitle: "Select Utility"}}/>
          <Stack.Screen name="[map]/[agent]/[utility]/index" options={{headerTitle: ""}}/>
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
