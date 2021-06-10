import * as React from 'react';
import { Image, View, StyleSheet, Platform, useWindowDimensions} from 'react-native';
import { Text, Button, Switch} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { DraggableGrid } from 'react-native-draggable-grid';

async function pickImageSystem(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.cancelled) {
      throw "Image pick cancelled";
    }

    return result.uri;
}


function renderItem(item){
  return (
      <Image source={{uri: item.uri}} style={{ width: 100, height : 100 }}/>
  );
};

export function ImagePickerComponent(props) {
  const [images, setImages] = React.useState([]);
  const [topIndex, setTopIndex] = React.useState(0)
  const [erase, setErase] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const windowWidth = useWindowDimensions().width;

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async ({count}) => {
    try{
      pickImageSystem().then((imageUri) => {
        const copy = [...images];
        const newIndex = topIndex + 1;
        copy.push({key: topIndex.toString(), uri: imageUri });
        setImages(copy);
        setTopIndex(newIndex);
        props.output(copy)
      });
    }catch(error){}
  };

  const eraseImage = (item) => {
      var copy = [...images];
      var i = 0;
      copy.splice(item.key, 1);
      copy.forEach((element) =>{
        element.key = i.toString();
        i++;
      })
      setTopIndex(i);
      setImages(copy);
      props.output(copy)
  };

  return (
    <View>
      <DraggableGrid
        numColumns={3}
        renderItem={renderItem}
        data={images}
        onDragRelease={(newImages) => {
          setImages(newImages);
        }}
        onItemPress={(item) => {
          if(erase){
            eraseImage(item);
          }
        }}
      />
      <View style = {{flexDirection : 'row'}}>
      <Text> Agregar </Text>
      <Button title='Agregar' onPress={pickImage}/>
      <Text> Borrar </Text>
      <Switch value={isSwitchOn} onValueChange={() => {
        setIsSwitchOn(!isSwitchOn);
        setErase(!erase);
      }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
    width:100,
    height:100,
    backgroundColor:'blue',
  },
  wrapper:{
  },
  item:{
    width:100,
    height:100,
    justifyContent:'center',
    alignItems:'center',
  },
  item_text:{
    fontSize:40,
    color:'#FFFFFF',
  },
});