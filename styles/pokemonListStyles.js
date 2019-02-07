import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4C495E',
    },
    searchArea: {
        height: 70,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd'
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#4C495E',
    },
    separator: {
        height: 3,
        backgroundColor: "#4C495E",
    },
    loadingText: {
        fontSize: 30,
        color: "#FFF",
        textAlign: 'center',
        margin: 15,
    },
    list: {
        flexGrow: 1,
    },
    item: {
        fontSize: 20,
        height: 30,
        color: 'black'
    },
    button: {
        width: '100%',
        margin: 10
    },
    amount: {
        fontSize: 20,
        color: "#FFF",
        textAlign: 'center',
        margin: 5,
    }
});
