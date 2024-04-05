import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

export default function Lineups() {
    const { map, agent, utility } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{agent} on {map}</Text>
        </View>
        // <Video
        //     source={{ uri: `https://d18zy66lz0kl5m.cloudfront.net/PC%20Anime%20Japanese%20Sunset%20Live%20Wallpaper.mp4` }}
        //     style={styles.video}
        //     resizeMode={ResizeMode.COVER}
        //     shouldPlay
        //     isLooping
        //     useNativeControls
        // />
    )
}

const styles = StyleSheet.create({
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    
    container: {
        flex: 1,
        paddingVertical: 20,
        flexWrap: 'wrap',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    video: {
        width: 200,
        height: 200,
    }
})
