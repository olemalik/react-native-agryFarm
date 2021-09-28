import * as React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { useDrawerStatus } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons'

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen=({ navigation })=> {
  return (<HomeStack.Navigator initialRouteName="Home" screenOptions={{
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
        // headerLeft: () => (
        //   <Icon.Button name='ios-menu' size={25} 
        //    backgroundColor='#009387' onPress={() =>
        //     navigation.openDrawer()} ></Icon.Button>
        // )
       }} /> 
  </HomeStack.Navigator> 
      )
};
const DetailsStackcreen=({ navigation })=> {
 return(<DetailsStack.Navigator initialRouteName="Home" screenOptions={{
         headerStyle :{ 
           backgroundColor :   '#009387'         
          },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight: 'bold'
          }
     }}> 
   <DetailsStack.Screen name="Details" component={DetailsScreen} ptions={{ 
        // headerLeft: () => (
        //   <Icon.Button name='ios-menu' size={25} 
        //    backgroundColor='#009387' onPress={() =>
        //     navigation.openDrawer()} ></Icon.Button>
        // )
       }} />
 </DetailsStack.Navigator> 
    )
};
function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Details" component={DetailsStackcreen} />
      </Drawer.Navigator>
      {/* */}
     </NavigationContainer>
  );
}
    
export default App;
