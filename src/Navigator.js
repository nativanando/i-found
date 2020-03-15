import Greeting from './Greeting';
import Home from './Home';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Navigator = createAppContainer(
    createStackNavigator({
        Greeting: Greeting,
        Home: Home,
    }, {
        headerMode: 'none'
    })
);

export default Navigator;