import { StyleSheet, StatusBar, Dimensions, Text, View, Pressable } from 'react-native';
import SymbolContainer from './components/SymbolContainer';
import Score from './components/Score';
import { useState } from 'react';

const uid = position => Math.floor(Math.random() * 1000000) + position;

export default function App() {
    const [scoreSymbols, setScoreSymbols] = useState({});
    const [pageCount, setPageCount] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [pageSymbolCount, setPageSymbolCount] = useState(0);

    const addSymbol = ([char, name]) => {
        let key;

        key = [`${name.toLowerCase()}-${uid(Object.keys(scoreSymbols).length)}`];

        setScoreSymbols(currentSymbols => ({
            ...currentSymbols,
            [key]: {
                name: name,
                char: char
            }
        }));
    };

    const handleSymbolPress = data => addSymbol(data);

    const getPageSymbols = () => {
        const allScoreSymbols = Object.entries(scoreSymbols);
        const pageSymbols = [];

        for (let i = (pageNum - 1) * 32; i < allScoreSymbols.length; i++ ) {
          if (pageSymbols.length === 32) {
            break;
          }

          pageSymbols.push(allScoreSymbols[i]);
        }

        pageSymbols.length !== pageSymbolCount && setPageSymbolCount(pageSymbols.length);

        return pageSymbols;
      }

    const handleClearScore = () => {
        setScoreSymbols({});
        setPageCount(1);
        setPageNum(1);
        setPageSymbolCount(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>LOD Score Creator</Text>
            <SymbolContainer  onSymbolPress={handleSymbolPress} />
            {/* <View style={{width: Dimensions.get('window').width - 60, ...styles.score}}> */}
                <Score pageSymbols={getPageSymbols()} pageNum={pageCount} />
            {/* </View> */}
            <View style={styles.buttonContainer}>
                <Pressable style={{...styles.button, ...styles.orangeButton}}>
                    <Text style={{...styles.buttonText, ...styles.orangeButtonText}}>Download</Text>
                </Pressable>
                <Pressable style={{...styles.button, ...styles.bluebutton}} onPress={handleClearScore}>
                <Text style={{...styles.buttonText, ...styles.blueButtonText}}>Clear</Text>
            </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0dfd5',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: StatusBar.currentHeight + 30,
        position: 'relative',
    },
    heading: {
        color: '#363636',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    score: {
        // Consider https://www.npmjs.com/package/react-native-shadow-2
        backgroundColor: 'white',
        aspectRatio: 3/4,
        elevation: 5,
        marginLeft: 'auto',
    },
    buttonContainer: {
        borderTopColor: '#aaa',
        borderTopWidth: 1,
        flexDirection: 'row',
        marginTop: 'auto',
        paddingVertical: 6,
    },
    button: {
        alignItems: 'center',
        borderRadius: 3,
        height: 50,
        justifyContent: 'center',
        width: '49%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orangeButton: {
        backgroundColor: '#f37c64',
        marginRight: '1%',
    },
    orangeButtonText: {
        color: '#363636',
    },
    bluebutton: {
        backgroundColor: '#499797',
        marginLeft: '1%',
    },
    blueButtonText: {
        color: '#fff',
    }
});
