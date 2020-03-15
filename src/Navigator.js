import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import Greeting from './Greeting';
import Home from './Home';

const Navigator = createAnimatedSwitchNavigator({
  Greeting: { screen: Greeting },
  Home: { screen: Home }
}, {
  headerMode: 'none',
  initialRouteName: 'Greeting',
  resetOnBlur: false,
  backBehavior: 'history',
  transition: (
    <Transition.Together>
      <Transition.Out
        type="scale"
        durationMs={400}
        interpolation="easeOut"
      />
      <Transition.In type="fade" durationMs={400} />
    </Transition.Together>
  ),
});

export default createAppContainer(Navigator);