import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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

    return (
        <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
            <ScrollView >
                
                <View style={styles.container}>
                    <Text style={styles.text}>{utility} Lineups on {map}</Text>
                </View>
                
                
                <View style={styles.checkboxesContainer}>
                    
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.text2}>A Site</Text>
                        <Pressable
                            style={[styles.checkboxBase, filters.aSite && styles.checkboxChecked]}
                            onPress={() => setFilters((prev) => ({...prev, aSite: !prev.aSite}))}>
                            {filters.aSite && <Ionicons name="checkmark" size={18} color="black" />}
                        </Pressable>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.text2}>B Site</Text>
                        <Pressable
                            style={[styles.checkboxBase, filters.bSite && styles.checkboxChecked]}
                            onPress={() => setFilters((prev) => ({...prev, bSite: !prev.bSite}))}>
                            {filters.bSite && <Ionicons name="checkmark" size={18} color="black" />}
                        </Pressable>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.text2}>C Site</Text>
                        <Pressable
                            style={[styles.checkboxBase, filters.cSite && styles.checkboxChecked]}
                            onPress={() => setFilters((prev) => ({...prev, cSite: !prev.cSite}))}>
                            {filters.cSite && <Ionicons name="checkmark" size={18} color="black" />}
                        </Pressable>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.text2}>Middle</Text>
                        <Pressable
                            style={[styles.checkboxBase, filters.middle && styles.checkboxChecked]}
                            onPress={() => setFilters((prev) => ({...prev, middle: !prev.middle}))}>
                            {filters.middle && <Ionicons name="checkmark" size={18} color="black" />}
                        </Pressable>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.text2}>Attack</Text>
                        <Pressable
                            style={[styles.checkboxBase, filters.attack && styles.checkboxChecked]}
                            onPress={() => setFilters((prev) => ({...prev, attack: !prev.attack}))}>
                            {filters.attack && <Ionicons name="checkmark" size={18} color="black" />}
                        </Pressable>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.text2}>Defense</Text>
                        <Pressable
                            style={[styles.checkboxBase, filters.defense && styles.checkboxChecked]}
                            onPress={() => setFilters((prev) => ({...prev, defense: !prev.defense}))}>
                            {filters.defense && <Ionicons name="checkmark" size={18} color="black" />}
                        </Pressable>
                    </View>
                
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
    checkboxBase: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: 'white',
        borderWidth: 0,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 15,
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