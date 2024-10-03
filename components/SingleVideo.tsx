import React, { memo } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { View, Text, StyleSheet } from 'react-native'
import {vh, vw} from '@/utils/dimensions'
import YoutubeIframe from 'react-native-youtube-iframe'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Alert, Share } from 'react-native'



function SingleVideo({title, videoId}: {title: string, videoId: string}) {

    const handleShare = async () => {
        try {
        const result = await Share.share({
            title: title,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            message: `https://www.youtube.com/watch?v=${videoId}`,
        }, {
            dialogTitle: "From the valorant lineup companion",
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }

    return (
        <View key={title} style={styles.videoWrapper}>
            
            <View style={styles.ytvideo}>
                <YoutubeIframe
                    height={vh * 0.3}
                    width={vw * 0.95}
                    videoId={videoId}
                    initialPlayerParams={{controls: true, color: 'white'}}
                    allowWebViewZoom={true}
                />
            </View>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: vh * 0.01, marginHorizontal: vw * 0.05}}>
                <Text style={styles.videoTitle}>{title}</Text>
                <View style={{display: "flex", flexDirection: "row", gap: 12}}>
                    <MaterialIcons onPress={() => console.log("Save")} name="save-alt" size={31} color="white" />
                    <Entypo onPress={handleShare} name="share" size={26} color="white" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    videoWrapper: {
        
    },

    videoTitle: {
        marginBottom: vh * 0.025,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        // alignSelf: 'center',
        marginTop: vh * 0.0025,
        textShadowColor: 'gray',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20,
        // fontFamily: 'Valorant',
    },

    ytvideo: {
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
        height: vh * 0.237,
        borderRadius: 25,
        backgroundColor: 'black',
        marginTop: vh * 0.015,
    },

});

export default memo(SingleVideo)