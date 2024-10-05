import React, { memo, useEffect, useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { View, Text, StyleSheet } from 'react-native'
import {vh, vw} from '@/utils/dimensions'
import YoutubeIframe from 'react-native-youtube-iframe'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Alert, Share } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite/next'
import WebView from 'react-native-webview'


function SingleVideo({title, videoId}: {title: string, videoId: string}) {

    

    const db = useSQLiteContext();

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
    

    const handleSave = async () => {
        // save the video to the database
        await db.execAsync // create the table if it doesnt exist
        (`CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT, videoId TEXT)`)

        const before = await db.getAllAsync('SELECT * FROM test') // just inspect the table
        console.log(before)

        await db.runAsync(`INSERT INTO test (title, videoId) VALUES (?, ?)`, [title, videoId]) // run your query

        const after = await db.getAllAsync('SELECT * FROM test') // inspect the table again
        console.log(after)
        
    }

    return (
        <View key={title} style={styles.videoWrapper}>
            
            <View style={styles.ytvideo}>
                <YoutubeIframe
                    height={vh * 0.3}
                    width={vw * 0.95}
                    videoId={videoId}
                    initialPlayerParams={{controls: true, color: 'white', rel:false, loop: true}}
                    allowWebViewZoom={true}
                    
                />
                {/* <WebView 
                    source={{ uri: `https://www.youtube.com/embed/${videoId}?controls=1&color=white&loop=1` }} 
                    style={{ height: vh * 0.3, width: vw * 0.95 }} 
                    javaScriptEnabled={true} 
                    domStorageEnabled={true} 
                /> */}
            </View>

            <View style={styles.infoWrapper}>
                <Text style={styles.videoTitle}>{title}</Text>
                <View style={{display: "flex", flexDirection: "row", gap: 12}}>
                    <MaterialIcons onPress={handleSave} name="save-alt" size={28} color="white" />
                    {/* <Entypo onPress={handleShare} name="share" size={26} color="white" /> */}
                    <SimpleLineIcons onPress={handleShare} name="paper-plane" size={22} color="white" style={{marginTop: 3}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    videoWrapper: {
        // height: vh * 0.335,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // borderRadius: 25,
        // borderBottomColor: 'white',
        // borderWidth: 1,
    },

    infoWrapper: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: vh * 0.025, 
        marginHorizontal: vw * 0.05,
        width: vw * 0.95,
        paddingRight: 15,
        paddingTop: 5,
        backgroundColor: 'rgba(128, 128, 128, 0.25)',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        
        
    },

    videoTitle: {
        marginBottom: vh * 0.015,
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        // alignSelf: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: vh * 0.0025,
        textShadowColor: 'gray',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        // fontFamily: 'Valorant',
    },

    ytvideo: {
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
        height: vh * 0.237,
        backgroundColor: 'black',
        marginTop: vh * 0.015,
    },



});

export default memo(SingleVideo)