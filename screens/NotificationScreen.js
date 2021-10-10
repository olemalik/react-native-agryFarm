import * as React from 'react'; 
import { Button, View, Text,StyleSheet } from 'react-native';
import PushController from '../controllers/PushController';

const NotificationScreen = ({ navigation })=> {
    return (
        <PushController/>
    );
  }
  export default NotificationScreen;