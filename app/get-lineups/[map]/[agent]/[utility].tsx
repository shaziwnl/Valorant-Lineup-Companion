import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Checkbox from '@/components/Checkbox';
import React from 'react';

const Videos: React.FC = () => {
    const bg = require('../../../../assets/images/wallpaper.jpg');
    const { map, agent, utility } = useLocalSearchParams();

    const [filters, setFilters] = React.useState({
        aSite: true,
        bSite: true,
        cSite: true,
        middle: true,
        attack: true,
        defense: true
    });

    let arr = ["LotusASiteBreachFlashPoint1", "LotusCSiteBreachFlashPoint1", "LotusBSiteBreachFlashPoint1",
    "Lotus Middle Breach FlashPoint 1", "LotusASiteBreachFlashPoint2", "LotusCSiteBreachFlashPoint2",]
    
    arr = arr.filter((string) => {
        return (string.toLowerCase().includes((utility as string).toLowerCase())
               && string.toLowerCase().includes((map as string).toLowerCase())
               && string.toLowerCase().includes((agent as string).toLowerCase()))
    })

    if (!filters.aSite) { arr = arr.filter((string) => !string.toLowerCase().includes("asite")) }
    if (!filters.bSite) { arr = arr.filter((string) => !string.toLowerCase().includes("bsite")) }
    if (!filters.cSite) { arr = arr.filter((string) => !string.toLowerCase().includes("csite")) }
    if (!filters.middle) { arr = arr.filter((string) => !string.toLowerCase().includes("middle")) }
    if (!filters.attack) { arr = arr.filter((string) => !string.toLowerCase().includes("attack")) }
    if (!filters.defense) { arr = arr.filter((string) => !string.toLowerCase().includes("defense")) }

    return (
        <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
            <ScrollView >

                <View style={styles.container}>
                    <Text style={styles.text}>{utility} Lineups on {map}</Text>
                </View>
            
                <View style={styles.checkboxesContainer}>
                    <Checkbox text="A Site" filters={filters} setFilters={setFilters} property="aSite" />
                    <Checkbox text="B Site" filters={filters} setFilters={setFilters} property="bSite" />
                    <Checkbox text="C Site" filters={filters} setFilters={setFilters} property="cSite" />
                    <Checkbox text="Middle" filters={filters} setFilters={setFilters} property="middle" />
                    <Checkbox text="Attack" filters={filters} setFilters={setFilters} property="attack" />
                    <Checkbox text="Defense" filters={filters} setFilters={setFilters} property="defense" />
                </View>

                <View>
                    {/* {arr.map((video, index) => {
                        return (
                            <Text style={styles.text2}>{arr.length}</Text>
                        )
                    })} */}
                    <Text style={styles.text2}>{JSON.stringify(arr)}</Text>
                </View>

            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderBottomColor: 'white',
        borderTopColor: 'white',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        height: 50,
    },
    text: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
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
        gap: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
    }
});

export default Videos;