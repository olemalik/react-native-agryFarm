import * as React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { useDrawerStatus } from '@react-navigation/drawer';
 
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
      {/* <Stack.Navigator initialRouteName="Home" screenOptions={{
         headerStyle :{
          backgroundColor :   '#009387'         
          },
          headerTintColor:'#fff', 
          headerTitleStyle:{
            fontWeight: 'bold'
          }
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ 
         title: 'Overview'
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator> */}
     </NavigationContainer>
  );
}
    
export default App;
