import { View, Text, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {vh, vw} from '@/utils/dimensions';
import Checkbox from '@/components/Checkbox';
import React, { useEffect, useState } from 'react';
import videoLinks from '@/utils/links';
import SingleVideo from '@/components/SingleVideo';
import { VideoLink } from '@/interfaces/VideoLink';
import { Link } from 'expo-router';

const Videos: React.FC = () => {
    const bg = require('../../../../assets/images/wallpaper.jpg');
    const { map, agent, utility } = useLocalSearchParams();
    const [arr, setArr] = useState(videoLinks[map as string][agent as string][utility as string])

    const [filters, setFilters] = useState({
        aSite: true,
        bSite: true,
        cSite: true,
        middle: true,
        attack: true,
        defense: true,
    });

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setArr(videoLinks[map as string][agent as string][utility as string])
        if (arr) {
            if (!filters.aSite) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("a site"))) }
            if (!filters.bSite) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("b site"))) }
            if (!filters.cSite) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("c site"))) }
            if (!filters.middle) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("middle"))) }
            if (!filters.attack) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("attack"))) }
            if (!filters.defense) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("defense"))) }
            // console.log(arr)
        }
    }, [filters])
    
    return (
        <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
            
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.70)', height: "100%", width: '100%'}}>
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
                    
                    {arr?.map((item: VideoLink) => {
                        const words = item.title.split(" ");
                        const title = words.slice(2).join(" ");
                        return (
                        <View key={item.id} style={styles.videoContainer}>
                            
                            <SingleVideo key={item.id} title={title} videoId={item.id}/>
                            
                        </View>
                        )
                    })}
                </ScrollView>
            </View>    
            
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        borderTopColor: 'white',
        borderTopWidth: 2,
    },

    videoContainer: {
        // display: 'flex',
        // flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: vh * 0.02,
        // justifyContent: 'center',
    },

    text: {
        marginTop: vh * 0.02,
        fontSize: vh * 0.025,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },

    checkboxesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: vw * 0.03,
        padding: vw * 0.025,
    },

});

export default Videos;