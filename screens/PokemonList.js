import React, {Component} from 'react';
import {
   ActivityIndicator,
   Button,
   FlatList,
   StyleSheet,
   SafeAreaView,
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

  SearchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`; // item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      pokeList: newData
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
    <SafeAreaView style = {{ flex: 1 }}>
      <StatusBar backgroundColor="red" />
      <View style={styles.searchArea}>
        <SearchBar
          round
          inputStyle={{ fontSize: 18}}
          inputContainerStyle={{ height: 50 }}
          containerStyle={{ height: 70, borderWidth: 1}}
          placeholder="Search Pokémon..."
          onChangeText={text => this.SearchFilterFunction(text)}
          // value={this.state.search}
        />  
      </View>

      <View style={styles.container}>
        <FlatList
          data={this.state.pokeList}
          renderItem={({ item }) =>
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

const styles = StyleSheet.create({
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
  list:{
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
