import React, { memo, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import {vh, vw} from '@/utils/dimensions'
import YoutubeIframe from 'react-native-youtube-iframe'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { Alert, Share } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite/next'
import { Modal } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Lineup } from '@/interfaces/Lineup'

function SingleVideo({title, videoId, map, agent, utility, saved, increment, setLineups, setModalVisible, setModalText}: 
    {
        title: string,
        videoId: string
        map: string,
        agent: string,
        utility: string,
        saved: boolean,
        increment?: () => void
        setLineups?: React.Dispatch<React.SetStateAction<Lineup[]>>
        setModalText?: React.Dispatch<React.SetStateAction<string>>
        setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
    }) {

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
            (`CREATE TABLE IF NOT EXISTS test (id TEXT PRIMARY KEY NOT NULL, title TEXT, map TEXT, agent TEXT, utility TEXT)`);

            const before = await db.getAllAsync('SELECT * FROM test') // just inspect the table
            console.log(before)

            await db.runAsync
            (`INSERT INTO test (id, title, map, agent, utility) VALUES (?, ?, ?, ?, ?)`,
            [videoId, title, map, agent, utility]) // run your query

            const after = await db.getAllAsync('SELECT * FROM test') // inspect the table again
            console.log(after)
            
            setModalVisible!(true);  

            
        } catch (error: any) {
            console.log(error.message);
            if (error.message.includes('UNIQUE constraint failed')) {
                setModalText!('Lineup already saved');
            } else { 
                setModalText!('Error saving lineup');
            }
            setModalVisible!(true);
        } finally {
            setTimeout(() => {
                setModalVisible!(false);
            }, 1250)
        }
    }

    const handleDelete = async () => {
        try {
            console.log("deleting");
            await db.runAsync(`DELETE FROM test where id = ?`, [videoId]) // run your query
            setLineups!((prev) => prev.filter((lineup) => lineup.id !== videoId));
            console.log("deleted");
        } catch (error: any) {
            console.log(error.message);
        }

    }

    return (

        <View style={styles.videoWrapper}>

            <View style={styles.ytvideo}>
                <Pressable onPress={increment}>
                    <YoutubeIframe
                        height={vh * 0.3}
                        width={vw * 0.95}
                        videoId={videoId}
                        initialPlayerParams={{controls: true, color: 'white', rel:false, loop: false}}
                        allowWebViewZoom={true}
                    />
                </Pressable>
            </View>
            
            <View style={styles.infoWrapper}>
                <Text style={styles.videoTitle}>{title}</Text>
                <View style={{display: "flex", flexDirection: "row", gap: 12}}>
                    {!saved ? <MaterialIcons onPress={handleSave} name="save-alt" size={28} color="white" /> :
                    <FontAwesome5 name="trash-alt" size={24} color="white" onPress={handleDelete} /> }
                    <SimpleLineIcons onPress={handleShare} name="paper-plane" size={22} color="white" style={{marginTop: 3}}/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    videoWrapper: {
        
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