import { StyleSheet, View, Pressable, Text }  from 'react-native';
import { useState } from 'react';
import buttonStyles from '../style_partials/buttonStyles';

const ScoreSymbolActions = ({selectedScoreSymbol, handleDeleteSymbol, handleSwapSymbol, closeSymbolActions}) => {
    const [chooseSymbolText, setChooseSymbolText] = useState(false);

    return (
        <View style={styles.symbolActions}>
            {chooseSymbolText ? <Text style={styles.chooseSymbolText}>Choose a new symbol</Text> : <Text style={styles.symbol}>{selectedScoreSymbol}</Text>}
            <Pressable style={{...styles.button, ...styles.orangeButton, marginTop: 'auto', marginHorizontal: 5}} onPress={handleDeleteSymbol}>
                <Text style={{...styles.buttonText, ...styles.greyText}}>Delete</Text>
            </Pressable>
            <Pressable style={{...styles.button, ...styles.bluebutton, margin: 5}} onPress={() => {handleSwapSymbol(); setChooseSymbolText(true);}}>
                <Text style={{...styles.buttonText, ...styles.whiteText}}>Swap</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={closeSymbolActions}>
                <Text style={styles.cancelButtonText}>X</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    symbolActions: {
        backgroundColor: 'white',
        borderColor: '#e0dfd5',
        borderWidth: 5,
        elevation: 7,
        height: 190,
        left: '25%',
        position: 'absolute',
        top: '25%',
        width: '50%',
    },
    symbol: {
        fontFamily: 'HutchinsonGuest',
        fontSize: 60,
        paddingVertical: 10,
        textAlign: 'center',
    },
    chooseSymbolText: {
        fontSize: 18,
        paddingVertical: 8,
        textAlign: 'center',
    },
    cancelButton: {
        alignItems: 'center',
        backgroundColor: '#363636',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        marginBottom: 5,
        marginHorizontal: 5,
        position: 'absolute',
        right:-35,
        top: -30,
        width: 50,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
    },
    ...buttonStyles
});

export default ScoreSymbolActions;