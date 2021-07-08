import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';

function renderItem({flatItem}, viewProjectCallback){
  const item = flatItem.item;
  return (
    <View style={styles.container}>
      <Card onPress={() => {viewProjectCallback(item.id)}}>
        <Card.Title title= {item.title} subtitle={item.type.charAt(0).toUpperCase() + item.type.slice(1) + ' - ' + item.location}/>
        <Card.Content>
          <Card.Cover source={{ uri: item.icon }} />
        </Card.Content>
      </Card>
    </View>
  );
};

// props: data - Con el formato: [{id, title, icon ...}]
//		  viewProjectCallback : Cuando se toca la tarjeta de un projecto. Recibe el id del proyecto.
//		  viewButtonsCallback : Cuando se opera con los botones inferiores.

export function ProjectListComponent(props) {
	return (
	<View style={{flex:1}}>
      <FlatList
        data={props.data}
        renderItem={(flatItem) => renderItem({flatItem}, props.viewProjectCallback)}
        keyExtractor={item => item.id}

        ListFooterComponent={
          <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            <IconButton
              icon='chevron-double-left'
              size={36}
              onPress={() => props.onPressReturn()}
              disabled={props.returnDisabled}
            />
            <IconButton
              icon='chevron-left'
              size={36}
              onPress={() => props.onPressReturn()}
              disabled={props.returnDisabled}
            />
            <View style={{marginRight:15, height:1, width:'5%', backgroundColor:'#000000', alignSelf:'center'}}/>
            <Text style={{fontSize:28, alignSelf:'center'}}>
              {props.page}
            </Text>
            <View style={{marginLeft:15, height:1, width:'5%', backgroundColor:'#000000', alignSelf:'center'}}/>            
            <IconButton
              icon='chevron-right'
              size={36}
              onPress={() => props.onPressNext()}
              disabled={props.nextDisabled}
            />
            <IconButton
              icon='chevron-double-right'
              size={36}
              onPress={() => props.onPressNext()}
              disabled={props.nextDisabled}
            />
          </View>
        }
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '10%',
    maxWidth: '80%',
  },
  scrollView: {
    marginHorizontal: 0,
  } ,
  title: {
    fontSize: 32,
  },
});