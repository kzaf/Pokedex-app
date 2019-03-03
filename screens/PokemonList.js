import React, {Component} from 'react';
import {
   ActivityIndicator,
   Button,
   FlatList,
   SafeAreaView,
   Text,
   View,
   StatusBar} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import CapitalizedText from '../components/CapitalizedText';
import styles from '../styles/pokemonListStyles';

export default class PokemonList extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      pokeList: [],
      search: ''
    }
    this.arrayholder = [];
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
        });
        this.arrayholder = response.results;
      })
      .catch(err => console.log(err));
  }

  _SearchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      pokeList: newData
    });
  }

  _listSeparator = () => {
    return ( <View style={styles.separator} /> );
  };

  render() {
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
      <SafeAreaView style = {{ flex: 1 }}>
        <StatusBar backgroundColor="red" />
        <View style={styles.searchArea}>
          <SearchBar
            round
            inputStyle={{ fontSize: 18}}
            inputContainerStyle={{ height: 50 }}
            containerStyle={{ height: 70, borderWidth: 1}}
            placeholder="Search Pokémon..."
            onChangeText={text => this._SearchFilterFunction(text)}
          />
        </View>

        <View style={styles.container}>
          <FlatList
            data={this.state.pokeList}
            renderItem={({ item }) =>
              <ListItem
                chevronColor="black"
                chevron
                title={
                   <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.pokemonNumber}>{'#' + item.url.slice(34).replace("/", "") + ' '}</Text>
                      <CapitalizedText style={styles.item}>
                        {item.name}
                      </CapitalizedText>
                   </View>
                }
                onPress={() => {
                  // Navigate to the PokemonDisplay route with params
                  this.props.navigation.navigate('PokemonDisplay', {
                    pokemonsUrlWithDetails: item.url
                  });
                }}
              />
            }
            ItemSeparatorComponent={this._listSeparator}
            keyExtractor={item => item.name}
          />

          <Text style={styles.amount}>
            Total amount: {this.state.pokeList.length}
          </Text>

          <Button buttonStyle={styles.button}
            color="red"
            title="Show first Pokémon"
          />

        </View>
      </SafeAreaView>

    );}
  }
}
