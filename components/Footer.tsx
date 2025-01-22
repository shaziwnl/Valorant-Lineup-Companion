import React from 'react'
import { View } from './Themed'
import { Link } from 'expo-router'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

function Footer() {
  return (
        <View style={{ display:'flex', flexDirection:'row', justifyContent: 'space-around', alignItems:'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 10 }}>
            <Link href="/">
                <FontAwesome name='home' size={30} color='white' />
            </Link>
            <Link href="/timer">
                {/* <Text style={{ color: 'white', textAlign: 'center'}}>Timer</Text> */}
                <MaterialIcons name='timer' size={30} color='white' />
            </Link>
            <Link href="/savedlineups">
                {/* <Text style={{ color: 'white' }}>Saved Lineups</Text> */}
                <MaterialIcons name='save-alt' size={30} color='white' />
            </Link>
        </View>
    )
}

export default Footer