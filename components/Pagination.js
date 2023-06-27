import { StyleSheet, View, Pressable, Text}  from 'react-native';
import buttonStyles from '../style_partials/buttonStyles';

const Pagination = props => {
    const isLastPage = props.currentPage === props.pageCount;
    let newPageBtn = null;
    let deletePageBtn = null;
    let prevBtn = null;
    let nextBtn = null;

    if (props.pageSymbolCount > 1 && props.pageSymbolCount % 32 === 0
        && isLastPage) {
        newPageBtn = true;
    }

    if (isLastPage && props.pageSymbolCount === 0) {
        deletePageBtn = true;
    }

    if (props.pageCount > 1) {
        prevBtn = true;
        nextBtn = true;
    }

    const newOnly = newPageBtn && props.pageCount === 1 ? {justifyContent: 'center'} : {};
    const isPrevDisabled = props.currentPage === 1 ? {opacity: 0.5} : {};
    const isNextDisabled = isLastPage ? {opacity: 0.5} : {};

    return (<View style={{...styles.pagination, ...newOnly}}>
                {prevBtn && <Pressable style={{...styles.button, ...styles.orangeButton, ...isPrevDisabled, width: '23%', marginRight: '2%'}} onPress={props.handlePrevPage} {...props.currentPage === 1 && {disabled: true}}>
                                <Text style={{...styles.buttonText, ...styles.orangeButtonText}}>Prev</Text>
                            </Pressable>}
                {newPageBtn && <Pressable style={{...styles.button, ...styles.bluebutton, ...styles.pageAction}} onPress={props.handleAddNewPage}>
                                <Text style={{...styles.buttonText, ...styles.blueButtonText}}>Add new page +</Text>
                            </Pressable>}
                {deletePageBtn && <Pressable style={{...styles.button, ...styles.bluebutton, ...styles.pageAction}} onPress={props.handleDeletePage}>
                                <Text style={{...styles.buttonText, ...styles.blueButtonText}}>Delete page x</Text>
                            </Pressable>}
                {nextBtn && <Pressable  style={{...styles.button, ...styles.orangeButton, ...isNextDisabled, width: '23%', marginLeft: 'auto'}} onPress={props.handleNextPage} {...isLastPage && {disabled: true}}>
                                <Text style={{...styles.buttonText, ...styles.orangeButtonText}}>Next</Text>
                            </Pressable>}
            </View>);
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        marginTop: 10,
    },
    pageAction: {
        width: '50%',
    },
    ...buttonStyles
});

export default Pagination;