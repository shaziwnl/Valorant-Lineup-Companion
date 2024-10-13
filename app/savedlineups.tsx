import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { View } from '@/components/Themed';
import { vw, vh } from '@/utils/dimensions'
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import SingleVideo from '@/components/SingleVideo';

const image = require('@/assets/images/wallpaper.jpg');

export default function SavedLineups() {

    const [lineups, setLineups] = useState([]);
    const db = useSQLiteContext();

    useEffect(() => {
        // db.execAsync // delete the table if you want
        //     (`DROP TABLE IF EXISTS test`);
        db.getAllAsync('SELECT * FROM test')
        .then((res: any) => {
            setLineups(res);
            console.log(res);
        })
        .catch((err: any) => {
            console.log(err);
        })

    }, []);

  return (
    
      <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <ScrollView>        
                    {lineups?.map((item: {
                        agent: string;
                        id: string;
                        map: string;
                        title: string;
                        utility: string;
                    }) => {
                        return (
                        <View key={item.id} style={styles.videoContainer}>
                            <SingleVideo key={item.id} title={item.title} videoId={item.id} saved={true} 
                                map={item.map as string} agent={item.agent as string} utility={item.utility as string}/>
                        </View>
                        )
                    })}
            </ScrollView>
        </View>
      </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: vh * 0.02,
        backgroundColor: "transparent",
    },

});
