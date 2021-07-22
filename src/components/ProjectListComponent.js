import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, ActivityIndicator } from 'react-native-paper';
import * as Client from  './../providers/client-provider.js';
import * as Auth from '../providers/auth-provider.js';
import { useIsFocused } from '@react-navigation/native';

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

export function ProjectListComponent(props) {
    const [page, setPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [visibleActivity, setVisibleActivity] = React.useState(false);
    const isFocused = useIsFocused();
    const limit = 5;

    React.useEffect(() => {
      
    if(!isFocused) return;
    setVisibleActivity(true);
    Auth.getIdToken(true).then((token) => {
      props.searchFunction(token, limit, page).then((resp) =>{
          setData(resp.map((element) => {
            element.id = element.id.toString();
            return element;
          }))
      }).catch((error) => {
         if(error != 401) console.log('Error:' + error)
      });
    }).catch((error) => {
       console.log(Auth.errorMessageTranslation(error));
    });
    setVisibleActivity(false);
  }, [isFocused, page, props.update]);

  const returnDisabled = () => {
    return page == 1;
  }

  const nextDisabled = () => {
    return data.length < limit;
  }

  const onPressReturn = () => {
    setPage((prevState, props) => {prevState - 1});
  }

  const onPressNext = () => {
    setPage((prevState, props) => {prevState + 1});
  }

	return (
	<View style={{flex:1}}>

       <ActivityIndicator
       animating = {visibleActivity}
       size = "large"
       style = {styles.activityIndicator}/>

      <FlatList
        data={data}
        renderItem={(flatItem) => renderItem({flatItem}, props.viewProjectCallback)}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
            <IconButton
              icon='chevron-left'
              size={36}
              onPress={() => onPressReturn}
              disabled={returnDisabled}
            />
            <View style={{marginRight:15, height:1, width:'5%', backgroundColor:'#000000', alignSelf:'center'}}/>
            <Text style={{fontSize:28, alignSelf:'center'}}>
              {page}
            </Text>
            <View style={{marginLeft:15, height:1, width:'5%', backgroundColor:'#000000', alignSelf:'center'}}/>            
            <IconButton
              icon='chevron-right'
              size={36}
              onPress={onPressNext}
              disabled={nextDisabled}
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