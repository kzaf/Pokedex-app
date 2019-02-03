import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  StatusBar} from 'react-native';
import CapitalizedText from '../components/CapitalizedText';
import Pokemon from '../components/Pokemon';

export default class PokemonDisplay extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      pokemon: {}
    }
  }

  async componentDidMount(){
    const { navigation } = this.props;
    const pokemonDetails = navigation.getParam('pokemonsUrlWithDetails', 'NO-ID');
    try {
      let response = await fetch(pokemonDetails);
      let responseJson = await response.json();
      this.setState({
        isLoading: false,
        pokemon: new Pokemon(responseJson),
      })
    } catch (error) {
      console.error(error);
    }
  }

  static navigationOptions = {
      title: 'PokéDetails',
      headerStyle: {
        backgroundColor: "red",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize:24,
        textAlign: 'center',
        alignSelf:'center',
        width: "80%",
      },
  };

  // nextPokemon = () => {
  //   this.setState({
  //       number: this.state.number + 1
  //   })
  //   this.componentDidMount();
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.indicator}>
          <Text style={styles.loadingText}>Loading Details</Text>
          <ActivityIndicator />
        </View>

      )
    }
    else {
      const pokemon = this.state.pokemon;
      return (
        <SafeAreaView style = {{flex: 1}}>
          <StatusBar backgroundColor="red" />
            <View style={ styles.topArea }> 
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.pokeName}> {'#' + pokemon.id + ' '} </Text>
                <CapitalizedText style={styles.pokeName}>
                  {pokemon.name}
                </CapitalizedText>
              </View>
              
              <Image
                style={styles.pokeIcon}
                source={{ uri: pokemon.sprite }}
              />
            </View>

          <View style={styles.container}>

            <Button style={styles.button}
            color="red"
            title="Next Pokémon"
            onPress={this.nextPokemon}
          />

          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    color: "#FFF",
    textAlign: 'center',
    margin: 10,
  },
  pokeIcon: {
    width: 200,
    height: 170
  }
});
