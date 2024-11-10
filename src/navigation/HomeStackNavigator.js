import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksList from '../screens/BooksList';
import BookDetail from '../screens/BookDetail';

const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BooksList"
      component={BooksList}
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="BookDetail"
      component={BookDetail}

    />
  </Stack.Navigator>
);

export default HomeStackNavigator;
