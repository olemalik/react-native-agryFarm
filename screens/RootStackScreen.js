import React from 'react'; 
import { View,StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => ( 
    <RootStack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#009387' },
        
    }} headerMode='none'>
        <RootStack.Screen  name="SplashScreen"  options={{ headerTitle:  "" }} component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen"  options={{ headerTitle:  "" }} component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen"  options={{ headerTitle:  "" }} component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;