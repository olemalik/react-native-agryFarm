import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';

const AgryInput = (props) => {
    const { colors } = useTheme();
    return (
        <Text style={[ styles.text_footer , {
            color: colors.text,
            marginTop: props?.styleMrginTop!=undefined ? props?.styleMrginTop : 0
        }]}  >  {props.label}</Text>
        
    )
}

const styles = StyleSheet.create({
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
})

export default AgryInput;