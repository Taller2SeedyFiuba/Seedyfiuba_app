import * as React from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

function SignInput ( props ) {
  return (
    <View>
      <TextInput
      label={props.aLabel}
      mode='outlined'
      dense={true}
      secureTextEntry={props.secureTextEntry}
      style={{margin:15}}
      value={props.aValue}
      onChangeText={props.onChangeValue}
      />
      <HelperText type="error" visible={props.showInvalidValue}>
      {props.textError}
      </HelperText>
    </View>
  )
}

export {SignInput}