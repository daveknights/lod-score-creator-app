import { StyleSheet, StatusBar, Dimensions, Text, View, Pressable } from 'react-native';
import SymbolContainer from './components/SymbolContainer';
import Score from './components/Score';
import ScoreSymbolActions from './components/ScoreSymbolActions';
import Pagination from './components/Pagination';
import { useState } from 'react';
import buttonStyles from './style_partials/buttonStyles';

const uid = position => Math.floor(Math.random() * 1000000) + position;

export default function App() {
    const [scoreSymbols, setScoreSymbols] = useState({});
    const [pageCount, setPageCount] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [pageSymbolCount, setPageSymbolCount] = useState(0);
    const [scoreSymbolKey, setScoreSymbolKey] = useState(null);
    const [selectedScoreSymbol, setSelectedScoreSymbol] = useState(null);
    const [enableSwap, setEnableSwap] = useState(false);

    const closeSymbolActions = () => {
        setScoreSymbolKey(null);
        setSelectedScoreSymbol(null);
        setEnableSwap(false);
    };

    const addSymbol = ([char, name]) => {
        if(!enableSwap && pageSymbolCount === 32 ||
            !enableSwap && selectedScoreSymbol) {
            return;
        }

        let key;

        if(enableSwap) {
            key = scoreSymbolKey
            closeSymbolActions();
        } else {
            key = [`${name.toLowerCase()}-${uid(Object.keys(scoreSymbols).length)}`];
        }

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

    const handleAddNewPage = () => {
        setPageNum(pageNum => pageNum + 1);
        setPageCount(pageCount => pageCount + 1);
    };

    const handleDeletePage = () => {
        setPageNum(pageNum => pageNum - 1);
        setPageCount(pageCount => pageCount - 1);
    }

    const handlePrevPage = () => setPageNum(pageNum => pageNum - 1);

    const handleNextPage = () => setPageNum(pageNum => pageNum + 1);

    const handlePressScoreSymbol = (key, char) =>  {
        setScoreSymbolKey(key);
        setSelectedScoreSymbol(char);
    }

    const handleDeleteSymbol = () => {
        setScoreSymbols(currentSymbols => {
          const updatedScoreSymbol = {...currentSymbols};

          delete updatedScoreSymbol[scoreSymbolKey];

          return updatedScoreSymbol;
        });

        closeSymbolActions();
    };

    const handleSwapSymbol = () => setEnableSwap(true);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>LOD Score Creator</Text>
            <SymbolContainer  onSymbolPress={handleSymbolPress} />
                <View style={{width: Dimensions.get('window').width - 60, marginLeft: 'auto'}}>
                    <Score
                        pageSymbols={getPageSymbols()}
                        pageNum={pageNum}
                        pageCount={pageCount}
                        pageSymbolCount={pageSymbolCount}
                        handlePressScoreSymbol={handlePressScoreSymbol} />
                    {selectedScoreSymbol && <ScoreSymbolActions
                                                selectedScoreSymbol={selectedScoreSymbol}
                                                handleDeleteSymbol={handleDeleteSymbol}
                                                handleSwapSymbol={handleSwapSymbol}
                                                closeSymbolActions={closeSymbolActions} />}
                    {Object.keys(scoreSymbols).length >= 32 && <Pagination
                                                                pageSymbolCount={pageSymbolCount}
                                                                handleAddNewPage={handleAddNewPage}
                                                                handleDeletePage={handleDeletePage}
                                                                currentPage={pageNum}
                                                                pageCount={pageCount}
                                                                handlePrevPage={handlePrevPage}
                                                                handleNextPage={handleNextPage} />}
                </View>
            <View style={styles.buttonContainer}>
                <Pressable style={{...styles.button, ...styles.orangeButton, width: '49%'}}>
                    <Text style={{...styles.buttonText, ...styles.greyText}}>Download</Text>
                </Pressable>
                <Pressable style={{...styles.button, ...styles.bluebutton, width: '49%', marginLeft: 'auto'}} onPress={handleClearScore}>
                <Text style={{...styles.buttonText, ...styles.whiteText}}>Clear</Text>
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
    buttonContainer: {
        borderTopColor: '#aaa',
        borderTopWidth: 1,
        flexDirection: 'row',
        marginTop: 'auto',
        paddingVertical: 6,
    },
    ...buttonStyles
});
