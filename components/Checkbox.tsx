import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const Checkbox = ({text, filters, setFilters, property}: any) => {
    
    return (
        <View style={styles.checkboxContainer}>
            <Text style={styles.text2}>{text}</Text>
            <Pressable
                style={[styles.checkboxBase, filters[property] && styles.checkboxChecked]}
                onPress={() => setFilters((prev: any) => ({...prev, [property]: !prev[property]}))}>
                {filters[property] && <Ionicons name="checkmark" size={18} color="black" />}
            </Pressable>
        </View>
        
    );
};

const styles = StyleSheet.create({
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
    text2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default Checkbox;