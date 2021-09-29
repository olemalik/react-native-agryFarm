import * as React from 'react'; 

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen'; 

const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen=()=> {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#009387',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={DetailsStackScreen}
            options={{
              tabBarLabel: 'Updates',
              tabBarColor: '#1f65ff',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={size} />
              ),
              tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarColor: '#694fad',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
            <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
              tabBarLabel: 'Explore',
              tabBarColor: '#d02860',    
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          /> 
        </Tab.Navigator>
      );
};
export default MainTabScreen;

const HomeStackScreen=({ navigation })=> {
    return (<HomeStack.Navigator  screenOptions={{
            headerStyle :{ 
              backgroundColor :   '#009387'         
             },
            headerTintColor:'#fff',
            headerTitleStyle:{ 
              fontWeight: 'bold'
             }
        }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{ 
          title: 'Overview', 
         }} /> 
    </HomeStack.Navigator> 
        )
  };
  const DetailsStackScreen=({ navigation })=> {
   return(   
    <DetailsStack.Navigator screenOptions={{
      headerStyle: {
      backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold' 
      }
  }}>
      <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        // headerLeft: () => (
        //     <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        // )
      }} />
</DetailsStack.Navigator>
      )
  };
