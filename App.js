
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PokemonList from './screens/PokemonList'
import PokemonDisplay from './screens/PokemonDisplay'

const Navigation = createStackNavigator ({
  PokemonList: {
    screen: PokemonList,
  },
  PokemonDisplay: {
    screen: PokemonDisplay,
  }
}, {
  initialRouteName: 'PokemonList',
});

export default createAppContainer(Navigation);
