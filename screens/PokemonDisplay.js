import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  TouchableHighlight} from 'react-native';
import { Container, Content, Icon, Card, CardItem, Body, Accordion } from 'native-base';
import CapitalizedText from '../components/CapitalizedText';
import Pokemon from '../components/Pokemon';
import styles from '../styles/pokemonDisplayStyles';

export default class PokemonDisplay extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      animationToggle: true,
      pokemon: {}
    }
  }
  static navigationOptions = {

    title: 'PokéDetails',
    headerStyle: {
      backgroundColor: "red",
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      textAlign: 'center',
      alignSelf: 'center',
      width: "80%",
    },
  };

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
      this.setState({
        uri: this.state.pokemon.sprite
      })
    } catch (error) {
      console.error(error);
    }
  }

  _renderHeader(item, expanded) {
    return (
      <View style={styles.renderHeaderItemStyle}>
        <Text style={{ fontSize: 25, color: 'black'}}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 25 }} name="remove-circle" />
          : <Icon style={{ fontSize: 25 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent(item) {
    if (item.title == "Stats"){
      return (
        <View style={styles.renderContentItemStyle}>

          {item.content.map(function (stat, i) {
            return <Text key={i}> 
                    {stat.stat.name + ': ' + stat.base_stat.toString()}
                   </Text>
          })}

        </View>
      );
    } else if (item.title == "Types"){
      return (
        <View
          style={styles.renderContentItemStyle}>
          {item.content.map(function (type, i) {
            return <Text key={i}>
              {i+1 + ': ' + type.type.name}
            </Text>
          })}
        </View>
      );
    } else if (item.title == "Abilities") {
      return (
        <View
          style={styles.renderContentItemStyle}>
          {item.content.map(function (ability, i) {
            return <Text key={i}>
              {i + 1 + ': ' + ability.ability.name}
            </Text>
          })}
        </View>
      );
    }else{
      return (
        <View
          style={ styles.renderContentItemStyle }>
          {item.content.map(function (move, i) {
            return <Text key={i}>
              {move.move.name}
            </Text>
          })}
        </View>
      );
    }
    
  }

  _loadPokemonStats(pokemon) {
    return(
      pokemonInfoDataArray = [
        { title: "Stats", content: pokemon.stats },
        { title: "Types", content: pokemon.types },
        { title: "Abilities", content: pokemon.abilities },
        { title: "Moves", content: pokemon.moves }
      ]
    );
  }

  _toggleImage(stateOfToggle) {
    this.setState({
      animationToggle: stateOfToggle
    });
  }

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
              
              <View> 
              <Text style={styles.pokeNameNormal}> {'Normal'} </Text>
              <TouchableHighlight onPress={() => this._toggleImage(!this.state.animationToggle)}>
                <Image
                  style={styles.pokeIcon}
                  source={{
                    uri: this.state.animationToggle ?
                      'https://raw.githubusercontent.com/kzaf/poke-sprites/master/graphics/pokemon/front/' + pokemon.name + '.gif' :
                      'https://raw.githubusercontent.com/kzaf/poke-sprites/master/graphics/pokemon/ani-front/' + pokemon.name + '.gif'
                  }} />
              </TouchableHighlight>
                
              </View>

              <View> 
              <Text style={styles.pokeNameShiny}> {'Shiny'} </Text>
              <TouchableHighlight onPress={() => this._toggleImage(!this.state.animationToggle)}>
                <Image
                  style={styles.pokeIcon}
                  source={{
                    uri: this.state.animationToggle ?
                      'https://raw.githubusercontent.com/kzaf/poke-sprites/master/graphics/pokemon/front-shiny/' + pokemon.name + '.gif' :
                      'https://raw.githubusercontent.com/kzaf/poke-sprites/master/graphics/pokemon/ani-front-shiny/' + pokemon.name + '.gif'
                  }} />
              </TouchableHighlight>

              

              </View>
              
            </View>

            <Container style = {styles.container}>

              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={styles.pokeIconCard} source={{uri: pokemon.sprite}} />
                      <Text style={styles.pokeName}> {'#' + pokemon.id} </Text>
                      <CapitalizedText style={styles.pokeName}>
                        {pokemon.name}
                      </CapitalizedText>
                    </View>
                  </Body>
                </CardItem>
              </Card>

              <Content padder style={{ backgroundColor: "white" }}>
                <Accordion
                  dataArray={this._loadPokemonStats(pokemon)}
                  animation={true}
                  expanded={true}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                />
              </Content>

            </Container>

        </SafeAreaView>
      );
    }
  }
}