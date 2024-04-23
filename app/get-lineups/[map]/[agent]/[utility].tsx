import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
import {vh, vw} from '@/utils/dimensions';
import Checkbox from '@/components/Checkbox';
import React, { memo, useEffect, useState } from 'react';
import videoLinks from '@/utils/links';
import SingleVideo from '@/components/SingleVideo';

const Videos: React.FC = () => {
    const bg = require('../../../../assets/images/wallpaper.jpg');
    const { map, agent, utility } = useLocalSearchParams();
    const [arr, setArr] = useState(videoLinks[map as string][agent as string])

    const [filters, setFilters] = useState({
        aSite: true,
        bSite: false,
        cSite: false,
        middle: false,
        attack: true,
        defense: true
    });

    useEffect(() => {
        setArr(videoLinks[map as string][agent as string])
        if (!filters.aSite) { setArr((arr: any) => arr.filter((string: string) => !string.toLowerCase().includes("asite"))) }
        if (!filters.bSite) { setArr((arr: any) => arr.filter((string: string) => !string.toLowerCase().includes("bsite"))) }
        if (!filters.cSite) { setArr((arr: any) => arr.filter((string: string) => !string.toLowerCase().includes("csite"))) }
        if (!filters.middle) { setArr((arr: any) => arr.filter((string: string) => !string.toLowerCase().includes("middle"))) }
        if (!filters.attack) { setArr((arr: any) => arr.filter((string: string) => !string.toLowerCase().includes("attack"))) }
        if (!filters.defense) { setArr((arr: any) => arr.filter((string: string) => !string.toLowerCase().includes("defense"))) }
    }, [filters])
    
    return (
        <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
            
            <View style={styles.container}>
                <Text style={styles.text}>{utility} Lineups on {map}</Text>
            
                <View style={styles.checkboxesContainer}>
                    <Checkbox text="A Site" filters={filters} setFilters={setFilters} property="aSite" />
                    <Checkbox text="B Site" filters={filters} setFilters={setFilters} property="bSite" />
                    <Checkbox text="C Site" filters={filters} setFilters={setFilters} property="cSite" />
                    <Checkbox text="Middle" filters={filters} setFilters={setFilters} property="middle" />
                    <Checkbox text="Attack" filters={filters} setFilters={setFilters} property="attack" />
                    <Checkbox text="Defense" filters={filters} setFilters={setFilters} property="defense" />
                </View>
            </View>

            <ScrollView>
            
                {/* <Text style={styles.videoTitle}>A Site Entrance</Text>
                <Video
                    style={styles.video}
                    source={{
                    uri: `${process.env.EXPO_PUBLIC_AWS_URL}/PC Anime Japanese Sunset Live Wallpaper.mp4`,
                    }}
                    positionMillis={1000}
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                />   */}

                {arr.map((item: any) => {
                    return (
                        <SingleVideo key={item} item={item}/>
                    )
                })}

                {/* {arr.map((item: any, index: any) => {
                    return <Text key={index} style={styles.text2}>{item}</Text>
                })} */}
            
            </ScrollView>
                
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    videoWrapper: {
        marginBottom: vh * 0.03,
    },

    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        borderTopColor: 'white',
        borderTopWidth: 2,
    },

    text: {
        marginTop: vh * 0.02,
        fontSize: vh * 0.025,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },

    videoTitle: {
        marginTop: vh * 0.03  ,
        marginBottom: vh * 0.005,
        fontSize: vh * 0.020,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },

    text2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },

    checkboxesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: vw * 0.03,
        padding: vw * 0.025,
    },

    video: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        width: vw * 0.9,
        height: vh * 0.25,
    },

});

export default Videos;