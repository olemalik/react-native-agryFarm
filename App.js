import * as React from 'react'; 

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';  
 
import MainTabScreen from './screens/MainTabScreen';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home " component={MainTabScreen} />
      </Drawer.Navigator>
     </NavigationContainer>
  );
}
    
export default App;
