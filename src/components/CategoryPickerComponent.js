import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select';

const raw_categories = ['arte', 'comida', 'danza', 'diseño', 'fotografía', 
'legal', 'manualidades', 'música', 'periodismo', 'publicaciones', 'refugio', 
'software', 'tecnología', 'transporte']

const categories = raw_categories.map((element) =>{return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }})

export function CategoryPickerComponent(props){
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
		<TextInput.Icon name='tag' style={{marginLeft:30}}/>
		  <View style={{marginHorizontal: 30}}>
			<RNPickerSelect
				onValueChange={ (type) => {props.setType(type)}}
				placeholder={{
					label: 'Categoría',
					value: '',
					color: '#9EA0A4',
				}}
				items={categories}
				useNativeAndroidPickerStyle={false}
			>
				<Text> {props.value.charAt(0).toUpperCase() + props.value.slice(1)} </Text>
			</RNPickerSelect>
		  </View>
		</View>
	);
}