import * as React from 'react'; 

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';  
 
import MainTabScreen from './screens/MainTabScreen';
import {DrawerContent} from './screens/DrawerContent';

const Drawer = createDrawerNavigator();

function App() {
  // return (
  //   <NavigationContainer DrawContent={props=> < DrawContent{...props}/>}>
  //       <Drawer.Navigator initia lRouteName="Home">
  //         <Drawer.Screen name="Home " component={MainTabScreen} />
  //     </Drawer.Navigator>
  //    </NavigationContainer>
  // );
  return (
    <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home " component={MainTabScreen} />
      </Drawer.Navigator>
     </NavigationContainer>
  );
}
    
export default App;
