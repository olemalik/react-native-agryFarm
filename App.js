import React, { useEffect } from 'react';
import { View, ActivityIndicator,Text } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import WeatherForecast from './screens/WeatherForecast';
import AgryMeetScreen from './screens/AgryMeetScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkProvider, NetworkConsumer} from 'react-native-offline';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(loggedInUser) => {
      const userToken = String(loggedInUser.uid);
      const userName = loggedInUser.username;
      
      try { 
        await AsyncStorage.setItem('loginUserDetails', JSON.stringify(loggedInUser));
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('loginUserDetails');
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
          <NetworkProvider shouldPing={true} pingInterval={100}>
            <NetworkConsumer>
              {({isConnected}) =>
                  isConnected ? 
                  (
                    <PaperProvider theme={theme}>
                      <AuthContext.Provider value={authContext}>
                        <NavigationContainer theme={theme}>
                          { loginState.userToken !== null ? 
                          (
                              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                                  {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} /> */}
                                    <Drawer.Screen name="WeatherForecast"   options={{ headerTitle:  "Weather Forecast" }} component={WeatherForecast} />
                                    <Drawer.Screen name="AgryMeetScreen"    options={{ headerTitle:  "Agry Meet" }} component={AgryMeetScreen} />
                                    <Drawer.Screen name="BookmarkScreen"    options={{ headerTitle:  "Bookmark" }} component={BookmarkScreen} />
                              </Drawer.Navigator>
                            )
                            :
                              <RootStackScreen/>
                            }
                          </NavigationContainer>
                        </AuthContext.Provider>
                      </PaperProvider>
                  ):(
                      <Text> No Network</Text>
                      )   
                }
              </NetworkConsumer>
          </NetworkProvider>
            );
          } 

export default App;
