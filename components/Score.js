import { StyleSheet, Dimensions, View, FlatList, Pressable, Text }  from 'react-native';
import { Fragment } from 'react';

const Score = ({pageSymbols, pageNum}) => {
    const getColumn = index => {
        let col;

        switch (true) {
            case index > 23:
                col = 4
                break;
            case index > 15:
                col = 3;
                break;
            case index > 7:
                col = 2;
                break;
            default:
                col = 1;
                break;
        }

        return col;
    };

    return (
        <View style={{width: Dimensions.get('window').width - 60, ...styles.page}}>
            {pageNum === 1 ? <View style={styles.startSymbol}><View style={styles.doubleLine}></View></View> : <View className={{...continueSymbol, ...continueBtm}}></View>}
            {pageSymbols.map(([key,symbol], index) => {
                let topContinue;
                let bottomContinue;

                switch (index) {
                  case 8:
                  case 16:
                  case 24:
                    topContinue = <View style={{...styles.continueSymbol, ...styles.continueTop, ...styles[`col${getColumn(index - 1)}`]}}>
                                    <View style={styles.singleLine}></View>
                                </View>;
                    bottomContinue = <View style={{...styles.continueSymbol, ...styles.continueBtm, ...styles[`col${getColumn(index)}`]}}>
                                        <View style={styles.singleLine}></View>
                                    </View>;
                    break;
                  default:
                    topContinue = null;
                    bottomContinue = null;
                    break;
                }

                return <Fragment key={`${key}${index}`}>
                            {bottomContinue}
                            <Pressable key={key} style={{...styles.symbolTile, ...styles[`col${getColumn(index)}`], ...styles[`row${(index % 8) + 1}`]}} onPress={()=>{console.log('Press');}}>
                                <Text style={styles.symbol}>{symbol.char}</Text>
                            </Pressable>
                            {topContinue}
                        </Fragment>;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        // Consider https://www.npmjs.com/package/react-native-shadow-2
        aspectRatio: 3/4,
        backgroundColor: 'white',
        elevation: 5,
        marginLeft: 'auto',
    },
    symbolTile: {
        position: 'absolute',
        width: '25%',
    },
    symbol: {
        fontFamily: 'HutchinsonGuest',
        fontSize: 56,
        paddingVertical: 5,
        textAlign: 'center',
    },
    startSymbol: {
        bottom: '1.04%',
        height: '1.04%',
        position: 'absolute',
        width: '25%',
    },
    doubleLine: {
        borderColor: 'black',
        borderWidth: 0,
        borderTopWidth: 0.75,
        borderBottomWidth: 0.75,
        height: '100%',
        marginLeft: '10%',
        width: '80%',
    },
    col1: {
        left: 0,
    },
    col2: {
        left: '25%',
    },
    col3: {
        left: '50%',
    },
    col4: {
        left: '75%',
    },
    row1: {
        bottom: '3.12%',
    },
    row2: {
        bottom: '14.84%',
    },
    row3: {
        bottom: '26.56%',
    },
    row4: {
        bottom: '38.28%',
    },
    row5: {
        bottom: '50%',
    },
    row6: {
        bottom: '61.72%',
    },
    row7: {
        bottom: '73.44%',
    },
    row8: {
        bottom: '85.16%',
    },
    continueSymbol: {
        height: '3.12%',
        position: 'absolute',
        width: '25%',
    },
    singleLine: {
        borderColor: 'black',
        borderWidth: 0,
        borderBottomWidth: 0.75,
        height: '50%',
        marginLeft: '10%',
        width: '80%',
    },
    continueBtm: {
        bottom: 0,
    },
    continueTop: {
        bottom: '96.88%',
    },
});

export default Score;