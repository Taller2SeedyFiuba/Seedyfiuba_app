import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';

const raw_categories = ['arte', 'comida', 'danza', 'diseño', 'fotografía', 
'legal', 'manualidades', 'música', 'periodismo', 'publicaciones', 'refugio', 
'software', 'tecnología', 'transporte']

const categories = raw_categories.map((element) =>{return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }})

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'black',
		borderRadius: 8,
		color: 'black',
		paddingLeft: 45, // to ensure the text is never behind the icon
	},
	iconContainer: {
		position: 'relative',
		bottom: 34,
		left: 10,
	}
  });

export function CategoryPickerComponent(props){
	return (
		<View>
		<RNPickerSelect
            placeholder={{
				label: 'Categoría',
				value: '',
				color: '#9EA0A4',
			}}
            items={categories}
            onValueChange={ (type) => {props.setType(type)}}
            style={pickerSelectStyles}
            value={props.value}
            useNativeAndroidPickerStyle={false}
			Icon={() => {return (<TextInput.Icon name='tag'/>)}}
		/>
		</View>
	);
}