import * as React from 'react';
import { View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const raw_categories = ['comida', 'arte', 'periodismo', 'manualidades', 'música',
 'danza', 'fotografía', 'diseño', 'publicaciones', 'tecnología', 'software',
 'refugio', 'transporte', 'legal']

const categories = raw_categories.map((element) =>{return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }})

export function CategoryPickerComponent(props){
	return (
		<View>
		 <RNPickerSelect
			onValueChange={ (type) => {props.setType(type)}}
			placeholder={{
			    label: 'Categoría',
			    value: '',
			    color: '#9EA0A4',
			}}

			items={categories}
		 />
		</View>
	);
}