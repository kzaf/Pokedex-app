import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar} from 'react-native';
import CapitalizedText from '../components/CapitalizedText';


export default class PokemonDisplay extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      pokeDetails: '',
      sprite:'https://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png'
    }
  }

  async getPokemonDetails(url) {
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      console.log(responseJson.sprites.front_default)
      this.setState({
        isLoading: false,
        sprite: responseJson.sprites.front_default,
        pokeDetails: responseJson
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

  nextPokemon = () => {
    this.setState({
        number: this.state.number + 1
    })
    this.componentDidMount();
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('item', 'NO-ID');
    this.getPokemonDetails(itemId.url);
    
    return (
    <View style={styles.container}>

      <StatusBar backgroundColor="red"/>

      <CapitalizedText style = {styles.pokeName}>
        {itemId.name}
      </CapitalizedText> 

      <Image
          style={styles.pokeIcon}
          source={{uri: this.state.sprite}}
    />

      <Button style = {styles.button}
          color = "red"
          title="Next Pokémon"
          onPress={this.nextPokemon}
      />
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C495E',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4C495E',
  },
  pokeName: {
    fontSize: 30,
    color: "#FFF",
    textAlign: 'center',
    margin: 15,
  },
  pokeIcon: {
    width: 200,
    height: 200
  }
});
