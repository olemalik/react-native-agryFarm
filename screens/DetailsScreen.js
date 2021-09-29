import * as React from 'react'; 
import { Button, View, Text,StyleSheet } from 'react-native';

const DetailsScreen = ({ navigation })=> {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Home')}
        />
         <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
  export default DetailsScreen;

  const styles= StyleSheet.create({
    container :{
        flex: 1, 
        alignItems: 'center',
         justifyContent: 'center' 
        },
  });