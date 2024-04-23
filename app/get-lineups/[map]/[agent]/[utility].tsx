import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {vh, vw} from '@/utils/dimensions';
import Checkbox from '@/components/Checkbox';
import React, { useEffect, useState } from 'react';
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
        defense: false
    });

    useEffect(() => {
        setArr(videoLinks[map as string][agent as string])
        if (!filters.aSite) { setArr((arr: any) => arr.filter((item: {title: string, id: string}) => !item.title.toLowerCase().includes("asite"))) }
        if (!filters.bSite) { setArr((arr: any) => arr.filter((item: {title: string, id: string}) => !item.title.toLowerCase().includes("bsite"))) }
        if (!filters.cSite) { setArr((arr: any) => arr.filter((item: {title: string, id: string}) => !item.title.toLowerCase().includes("csite"))) }
        if (!filters.middle) { setArr((arr: any) => arr.filter((item: {title: string, id: string}) => !item.title.toLowerCase().includes("middle"))) }
        if (!filters.attack) { setArr((arr: any) => arr.filter((item: {title: string, id: string}) => !item.title.toLowerCase().includes("attack"))) }
        if (!filters.defense) { setArr((arr: any) => arr.filter((item: {title: string, id: string}) => !item.title.toLowerCase().includes("defense"))) }
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
        
                {arr.map((item: any) => {
                    return (
                        <SingleVideo key={item.title} title={item.title} videoId={item.id}/>
                    )
                })}
            
            </ScrollView>
                
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