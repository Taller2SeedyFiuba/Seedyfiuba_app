import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';

const raw_stages = ['en curso', 'cancelado', 'completado']

const stages = raw_stages.map((element) =>{return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }})

export function StagePickerComponent(props){
	return (
		<View style={{
			fontSize: 16,
			paddingVertical: 12,
			paddingHorizontal: 10,
			borderWidth: 1,
			borderColor: 'gray',
			borderRadius: 4,
			color: 'black',
			paddingRight: 30,
			justifyContent:'center',
			marginVertical: 15,
			flex:1
		  }}>
		<TextInput.Icon name='alpha-f-box-outline' style={{marginLeft:30}}/>
		  <View style={{marginHorizontal: 30}}>
			<RNPickerSelect
				onValueChange={ (stage) => {props.setStage(stage)}}
				placeholder={{
					label: 'Categoría',
					value: '',
					color: '#9EA0A4',
				}}
				items={stages}
				useNativeAndroidPickerStyle={false}
			>
				<Text> {props.value.charAt(0).toUpperCase() + props.value.slice(1)} </Text>
			</RNPickerSelect>
		  </View>
		</View>
	);
}