import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center', 
        alignContent: 'center', 
    },
    activityIndicator: {
        margin: 20
    }
})

export default function PortalActivityIndicator(props) {
    return (
        props.isVisible ?
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                size="large"
                style={styles.activityIndicator}
            />
        </View>
        :
        <></>
    )
}