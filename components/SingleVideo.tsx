import React, { memo, useEffect, useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import {vh, vw} from '@/utils/dimensions'
import YoutubeIframe from 'react-native-youtube-iframe'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Alert, Share } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { useSQLiteContext } from 'expo-sqlite/next'
import WebView from 'react-native-webview'
import { Modal } from 'react-native'


function SingleVideo({title, videoId}: {title: string, videoId: string}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAnimation, setModalAnimation] = useState<"slide" | "none" | "fade">('fade');
    const [modalText, setModalText] = useState('Lineup Saved!');

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
        try {
            // await db.execAsync // delete the table if you want
            // (`DROP TABLE IF EXISTS test`);

            await db.execAsync // create the table if it doesnt exist
            (`CREATE TABLE IF NOT EXISTS test (id TEXT PRIMARY KEY NOT NULL, title TEXT)`)

            const before = await db.getAllAsync('SELECT * FROM test') // just inspect the table
            console.log(before)

            await db.runAsync(`INSERT INTO test (id, title) VALUES (?, ?)`, [videoId, title]) // run your query

            const after = await db.getAllAsync('SELECT * FROM test') // inspect the table again
            console.log(after)
            
            setModalVisible(true);  

            
        } catch (error: any) {
            console.log(error.message);
            if (error.message.includes('UNIQUE constraint failed')) {
                setModalText('Lineup already saved');
            } else { 
                setModalText('Error saving lineup');
            }
            setModalVisible(true);
        } finally {
            
            setTimeout(() => {
                setModalVisible(false);
            }, 1750)
        }
    }

    return (

        <View key={title} style={styles.videoWrapper} onTouchEnd={() => {
            if (modalVisible) {
                setModalVisible(!modalVisible);
            }
            }}>
            
        <Modal
            animationType={modalAnimation}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <Pressable
                    style={[styles.pressable]}
                    onPress={() => setModalVisible(false)}>
                    <View style={{}}>
                        {/* <Text style={styles.modalText}>Lineup Saved!</Text> */}
                        {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                        <Text style={styles.modalText}>{modalText}</Text>
                    </View>
                </Pressable>
        </Modal>

                <View style={styles.ytvideo}>
                    <YoutubeIframe
                        height={vh * 0.3}
                        width={vw * 0.95}
                        videoId={videoId}
                        initialPlayerParams={{controls: true, color: 'white', rel:false, loop: true}}
                        allowWebViewZoom={true}
                    />
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

    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: vh * 0.1,
    },

    pressable: {
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop: "auto",
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: vh * 0.05,
        width: "auto",
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        
        textAlign: 'center',
        color: 'white',
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