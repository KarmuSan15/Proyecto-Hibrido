import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';



import HomeScreen from './HomeScreen';
import SlimeRancher1Screen from './SlimeRancher1Screen';
import SlimeRancher2Screen from './SlimeRancher2Screen';
import ProfileScreen from './ProfileScreen';
import SlimePokeScreen from './SlimePokeScreen'; 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Slime Registro"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#f0f0f0',
            width: 240,
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="Slime Registro"
          component={HomeScreen}
          options={{
            drawerIcon: () => <MaterialCommunityIcons name="home" size={24} color="#224934" />,
            headerStyle: {
              backgroundColor: '#224934', 
            },
          }}
        />
        <Drawer.Screen
          name="Slime Rancher 1"
          component={SlimeRancher1Screen}
          options={{
            drawerIcon: () => <MaterialCommunityIcons name="emoticon-happy" size={24} color="#61f8f8" />,
            headerStyle: {
              backgroundColor: '#61f8f8', 
            },
          }}
        />
        <Drawer.Screen
          name="Slime Rancher 2"
          component={SlimeRancher2Screen}
          options={{
            drawerIcon: () => <MaterialCommunityIcons name="emoticon-cool" size={24} color="#90e96e" />,
            headerStyle: {
              backgroundColor: '#90e96e', 
            },
          }}
        />
      
         <Drawer.Screen
          name="Slime Poke"
          component={SlimePokeScreen}
          options={{
            drawerIcon: () => <MaterialCommunityIcons name="pokeball" size={24} color="#ff78b8" />,
            headerStyle: {
              backgroundColor: '#ff78b8', 
            },
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: () => <MaterialCommunityIcons name="account" size={24} color="#fccd4c" />,
            headerStyle: {
              backgroundColor: '#ff8c32', 
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
