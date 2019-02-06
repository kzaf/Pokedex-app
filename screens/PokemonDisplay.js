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
import { Container, Header, Content, Icon, Card, CardItem, Body, Accordion } from 'native-base';
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
          <Text>
            {item.content}
          </Text>
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
        { title: "Types", content: "Lorem ipsum dolor sit amet" },
        { title: "Moves", content: pokemon.moves }
      ]
    );
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
              
              <Image
                style={styles.pokeIcon}
                source={{ uri: pokemon.sprite }}
              />
            </View>

            <Container style = {styles.container}>

              <Card>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: 'row' }}>
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
