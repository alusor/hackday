import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Main, Hero } from './Views';

const App = StackNavigator({
  inicio: { screen: Main },
  hero: { screen: Hero }
});

export default App;