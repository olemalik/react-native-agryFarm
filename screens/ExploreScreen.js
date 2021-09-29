import * as React from 'react'; 
import { Button, View, Text,StyleSheet } from 'react-native';

const ExploreScreen=()=> {
    return (
      <View style={styles.container}>
        <Text>Explore Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked')}
        />
      </View>
    );
  }
  export default ExploreScreen;

  const styles= StyleSheet.create({
    container :{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center' 
    },
});