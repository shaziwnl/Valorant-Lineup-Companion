import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { View } from '@/components/Themed';
import Map from '@/components/Map';
import { vw, vh } from '@/utils/dimensions'

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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: vh * 0.05,
    justifyContent: 'center',
    paddingVertical: vh * 0.05,
  },

});
