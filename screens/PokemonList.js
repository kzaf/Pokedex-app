import React, {Component} from 'react';
import {
   ActivityIndicator,
   Button,
   FlatList,
   StyleSheet,
   Text,
   View,
   StatusBar} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import CapitalizedText from '../components/CapitalizedText';

export default class PokemonList extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      pokeList: []
    }
  }

  static navigationOptions = {
      title: 'PokéList',
      headerStyle: {
        backgroundColor: "red",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize:24,
        textAlign: 'center',
        flex:1
      },
  };

  componentDidMount () {
    return fetch('http://pokeapi.co/api/v2/pokemon/?limit=1000')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          isLoading: false,
          pokeList: response.results
        })
      })
      .catch(err => console.log(err));
  }

  SearchFilterFunction(text) {
    const newData = this.state.pokeList.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      pokeList: newData,
      text: text,
    });
  }

  listSeparator = () => {
    return ( <View style={styles.separator} /> );
  };

  render() {

  const { search } = this.state.pokeList;

  if(this.state.isLoading) {
    return(

    <View style = {styles.indicator}>
        <Text style = {styles.loadingText}>Loading PokéList</Text>
        <ActivityIndicator />
    </View>

    )
  }
  else{
    return (

    <View style={styles.container}>

      <StatusBar backgroundColor="red" />

      <SearchBar
        round
        clearIcon
        cancelButtonTitle="Cancel"
        placeholder="Search Pokémon..."
        onChangeText={text => this.SearchFilterFunction(text)}
        onClear={text => this.SearchFilterFunction('')}
        value={search}
      />

      <FlatList
        data={this.state.pokeList}
        renderItem={({item}) =>
          <ListItem
            onPress={() => {
              // Navigate to the PokemonDisplay route with params
              this.props.navigation.navigate('PokemonDisplay', {
                pokemonsUrlWithDetails: item.url
              });
            }}
            chevronColor="black"
            chevron
            title={
              <CapitalizedText style={styles.item}>
                {item.name}
              </CapitalizedText>
            }
          />
        }
        ItemSeparatorComponent={this.listSeparator}
        keyExtractor={item => item.name}
      />

      <Text style = {styles.amount}>
        Total amount: {this.state.pokeList.length}
      </Text>

      <Button buttonStyle = {styles.button}
        color = "red"
        title="Show first Pokémon"
        onPress={() => this.props.navigation.navigate("PokemonDisplay")}
      />

    </View>
  );}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C495E',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4C495E',
  },
  separator: {
    height: 2,
    backgroundColor: "#4C495E",
  },
  loadingText: {
    fontSize: 30,
    color: "#FFF",
    textAlign: 'center',
    margin: 15,
  },
  list:{
    flexGrow: 1,
  },
  item: {
    fontSize: 20,
    height: 30,
    color: '#000000'
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
