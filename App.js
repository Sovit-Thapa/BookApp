// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import TabNavigator from './src/navigation/TabNavigator';
import store from './src/redux/store';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;