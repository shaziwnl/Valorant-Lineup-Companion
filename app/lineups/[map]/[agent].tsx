import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function Lineups() {

    const { map, agent } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{agent} on {map}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    
    container: {
        flex: 1,
        paddingVertical: 20,
        flexWrap: 'wrap',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})
