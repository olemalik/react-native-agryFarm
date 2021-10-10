import React,{ useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet ,Alert} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import AgryInput from '../customComponent/AgryInput';
 
const JitsiCallScreen = (props) => { 
  const selectUserType ="Select an option.";
  const [userTypes, setUserTypes] = React.useState([]);
  const [selectedUserItem, setSelectedUserItem] = React.useState([]);

  useEffect(() => {
    setTimeout(() => { 
    firestore()
    .collection('userdetails')
    .get()
    .then(querySnapshot => {
         let userTypeData=[{userid :0 , name: selectUserType}];
      querySnapshot.forEach(documentSnapshot => {
         var objectUserDetails =documentSnapshot.data();
            
         if(objectUserDetails.usertype!= "Farmer"){
             userTypeData.push({ userid : objectUserDetails.uid ,name : objectUserDetails.displayName })
         }
         setUserTypes(userTypeData);
      });
    });
  }, 1000);
  }, []);
  

const selectedUserType =(selectedItem)=>{ 
 
  if(selectedItem.name !=  selectUserType || selectedItem.name !='') {  
    setSelectedUserItem(
      selectedItem.userid
    );
  
   
} else {
  setSelectedUserItem(0);
}
}

const agryCallHandle = (nav) => {

if(selectedUserItem==0){
 
  Alert.alert("Invalid User","Please Select a User to continue.");
  return false;
} 
return nav("AgryMeetScreen");  

}
    return (
      <View style={styles.container}>
       <AgryInput  label={"Agriculturist"}></AgryInput>     
            <View style={styles.action}>
                <SelectDropdown 
                    style={styles.dropDown}
                    data={userTypes}
                    onSelect={(selectedItem, index) => selectedUserType(selectedItem)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                         return selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => { 
                        return item.name
                    }}
                />
            </View> 
        <Button
          title="Join" 
          onPress={() => {agryCallHandle(props.navigation.navigate)}}
        />
      </View>
    );
};

export default JitsiCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
   dropDown: {
    width: '100%',
    height: 50, 
    borderRadius: 10
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
}
});