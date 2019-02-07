import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    topArea: {
        height: 200,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4C495E',
    },
    container: {
        flex: 2,
        justifyContent: 'center'
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#4C495E',
    },
    loadingText: {
        fontSize: 30,
        color: "#FFF",
        textAlign: 'center',
        margin: 15,
    },
    pokeName: {
        fontSize: 25,
        color: "#000",
        textAlign: 'center',
        margin: 10,
    },
    pokeIcon: {
        width: 200,
        height: 170
    },
    renderHeaderItemStyle: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#777291"
    },
    renderContentItemStyle: {
        backgroundColor: "#e5e5e5",
        padding: 10,
        fontStyle: "italic",
    }
});
