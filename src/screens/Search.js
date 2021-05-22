import * as React from 'react';
import { View } from 'react-native';
import { List, Searchbar, RadioButton, Appbar } from 'react-native-paper';

function Search () {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [option, setOption] = React.useState('Proyect Geographic')

    return(
    <View style={{justifyContent:'center', flex:1}}>
    <Appbar.Header>
      <Appbar.Content title='Búsqueda'/>
    </Appbar.Header>
        <View style={{justifyContent:'flex-start', flex:1, marginLeft: '10%',
    maxWidth: '80%'}}>

    
      <View style={{justifyContent:'center', flex:1}}>
        <Searchbar
          placeholder='Buscar'
          onChangeText={searchQuery => setSearchQuery(searchQuery)}
          value={searchQuery}
        />
      </View>
            <View style={{justifyContent:'flex-start', flex:3}}>
        <List.Section title='Tipo de Búsqueda'>
          <RadioButton.Group
          value={option}
          onValueChange={value  => setOption(value)}>
          <RadioButton.Item label='Proyecto (Ubicación)' value='Proyect Geographic' mode='android' />
          <RadioButton.Item label='Proyecto (Tipo)' value='Proyect Stage' mode='android' />
          <RadioButton.Item label='Proyecto (Etapa)' value='Proyect Hashtag' mode='android' />
          <RadioButton.Item label='Proyecto (Hashtag)' value='Proyect Type' mode='android' />
          <RadioButton.Item label='Usuario' value='User' mode='android' />
          </RadioButton.Group>
        </List.Section>
      </View>
        </View>
    </View>
    );
}

export {Search}