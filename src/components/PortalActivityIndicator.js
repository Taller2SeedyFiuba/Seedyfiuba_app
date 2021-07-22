import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: 'center', 
        alignContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    activityIndicator: {

    }
})

export default function PortalActivityIndicator(props) {
    return (
        props.isVisible ?
        <Portal>
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={styles.activityIndicator}
                />
            </View>
        </Portal>
        :
        <></>
    )
}