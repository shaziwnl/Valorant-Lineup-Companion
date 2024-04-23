import React, { memo } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { View, Text, StyleSheet } from 'react-native'
import {vh, vw} from '@/utils/dimensions'


function SingleVideo({item}: any) {
  return (
    <View key={item} style={styles.videoWrapper}>
        <Text style={styles.videoTitle}>{item}</Text>
        <Video
            style={styles.video}
            source={{
            uri: `${process.env.EXPO_PUBLIC_AWS_URL}/${item}.mp4`,
            }}
            positionMillis={1000}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
        />
    </View>
  )
}

const styles = StyleSheet.create({

    videoWrapper: {
        marginBottom: vh * 0.03,
    },

    videoTitle: {
        marginTop: vh * 0.03  ,
        marginBottom: vh * 0.005,
        fontSize: vh * 0.020,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },

    video: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        width: vw * 0.9,
        height: vh * 0.25,
    },

});

export default memo(SingleVideo)