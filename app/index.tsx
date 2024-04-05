import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { View } from '@/components/Themed';
import Map from '@/components/Map';


const image = require('../assets/images/wallpaper.jpg');
const MapList = ['Ascent', 'Bind', 'Lotus', 'Breeze', 'Split', 'Haven', 'Fracture', 'Pearl', 'Icebox'];

export default function TabOneScreen() {  

  return (
    <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <View style={styles.container}>
          {MapList.map((mapName) => (
            <Map key={mapName} name={mapName}/>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    justifyContent: 'center',
    paddingVertical: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  mapContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
  },
});
