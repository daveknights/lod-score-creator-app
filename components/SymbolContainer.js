import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, Pressable, Animated, FlatList, Text }  from 'react-native';

const symbols = [
    {id: 'spring', char: 1, name: 'Spring'},
    {id: 'extension', char: 2, name: 'Extension'},
    {id: 'balance', char: 3, name: 'Balance'},
    {id: 'bodyshape', char: 4, name: 'Bodyshape'},
    {id: 'flexion', char: 5, name: 'Flexion'},
    {id: 'travelling', char: 6, name: 'Travelling'},
    {id: 'rotation', char: 7, name: 'Rotation'},
    {id: 'fall', char: 8, name: 'Fall'},
    {id: 'stillness', char: 9, name: 'Stillness'}
];
const containerHeight = (Object.keys(symbols).length * 49) + 48;

const SymbolContainer = ({onSymbolPress}) => {
    const [isReady, setIsReady] = useState(false);
    const symbolContainerWidth = useRef(new Animated.Value(45)).current;

    useEffect(() => {
        async function loadHGFont() {
            try {
              await Font.loadAsync({
                'HutchinsonGuest': require('../assets/fonts/HutchinsonGuest.ttf'),
              });
            } catch (e) {
              console.warn(e);
            } finally {
              setIsReady(true);
            }
          }

          loadHGFont();
    }, []);

    if (!isReady) {
        return null;
    }

    const toggleContainerWidth = () => {
        const newValue = JSON.stringify(symbolContainerWidth,["width"]) == 45 ? 140 : 45;

        Animated.timing(symbolContainerWidth,
            {
                toValue: newValue,
                duration: 250,
                useNativeDriver: false,
            }
        ).start()
    };

    return (
        <Animated.View style={{width: symbolContainerWidth, ...styles.container}}>
            <Pressable style={styles.symbolNameToggle} onPress={toggleContainerWidth}>
                <Image source={require('../images/chevron-icon.png')} style={styles.chevron} />
            </Pressable>
            <FlatList
                data={symbols}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return <Pressable style={styles.symbolTile} onPress={() => onSymbolPress([item.char, item.name])}>
                        <Text style={styles.symbol}>{item.char}</Text>
                        <Text style={styles.symbolName}>{item.name}</Text>
                    </Pressable>
                }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0dfd5',
        elevation: 1,
        height: containerHeight,
        left: 0,
        position: 'absolute',
        top: 143,
        zIndex: 1,
    },
    symbolNameToggle: {
        backgroundColor: '#363636',
        height: 48,
        justifyContent: 'center',
        width: '100%',
    },
    chevron: {
        height: 24,
        marginLeft: 'auto',
        marginRight: 16,
        width: 13,
    },
    symbolTile: {
        alignItems: 'center',
        borderTopColor: '#363636',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 49,
        width: 140,
    },
    symbol: {
        backgroundColor: '#fff',
        fontFamily: 'HutchinsonGuest',
        fontSize: 36,
        paddingVertical: 10,
        textAlign: 'center',
        width: 45,
    },
    symbolName: {
        fontSize: 14,
        paddingLeft: 10,
        width: 95,
    },
});

export default SymbolContainer;