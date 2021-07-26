import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Text, Button, Portal } from 'react-native-paper';

export function ConfirmationBox(props) {
    return (
    <Portal>
        <Dialog visible={props.visible} onDismiss={() => props.setVisible(false)}>
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Content>
            <Text>{props.description}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.onCancel}>Cancelar</Button>
            <Button onPress={props.onContinue}>Continuar</Button>
          </Dialog.Actions>
        </Dialog>
    </Portal>
    )
}

export function AcceptBox(props) {
    return (
    <Portal>
        <Dialog visible={props.visible} onDismiss={() => props.setVisible(false)}>
          <Dialog.Title>props.title</Dialog.Title>
          <Dialog.Content>
            <Text>prop.description</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.onAccept}>Aceptar</Button>
          </Dialog.Actions>
        </Dialog>
    </Portal>
    )
}