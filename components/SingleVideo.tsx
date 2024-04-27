import React, { memo } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { View, Text, StyleSheet } from 'react-native'
import {vh, vw} from '@/utils/dimensions'
import YoutubeIframe from 'react-native-youtube-iframe'

function SingleVideo({title, videoId}: {title: string, videoId: string}) {
  return (
    <View key={title} style={styles.videoWrapper}>
        <Text style={styles.videoTitle}>{title}</Text>
        {/* <Video
            style={styles.video}
            source={{
            uri: `${process.env.EXPO_PUBLIC_AWS_URL}/${item}.mp4`,
            }}
            positionMillis={1000}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
        /> */}
        <View style={styles.ytvideo}>
            <YoutubeIframe
                height={vh * 0.25}
                width={vw * 0.9}
                videoId={videoId}
                initialPlayerParams={{controls: true}}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    videoWrapper: {
        marginBottom: vh * 0.01,
    },

    videoTitle: {
        marginTop: vh * 0.03  ,
        marginBottom: vh * 0.005,
        fontSize: vh * 0.020,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        textShadowColor: 'white',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20,
    },

    ytvideo: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        height: vh * 0.237,
        backgroundColor: 'black',
    },

});

export default memo(SingleVideo)