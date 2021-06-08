import * as React from 'react';
import { Button, Image, View, Platform, StyleSheet, FlatList } from 'react-native';
import { Text, Avatar, Card, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ProgressBar } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';
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

export function ImagePickerExample({navigation}) {
  const [transferred, setTransferred] = React.useState(0);
  const [images, setImages] = React.useState([
  {
    key: '1',
    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Raunkiaer.jpg'
  },
  {
    key: '2',
    uri: 'https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/Purina%C2%AE%20La%20llegada%20del%20gatito%20a%20casa.jpg?itok=_3VnSPSlg'
  },
]);
  const [visible, setIsVisible] = React.useState(false);

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
        Auth.uploadImageAsync(imageUri).then((imageUrl) => {
          copy.push({id: 3, uri: imageUrl });
          setImages(copy);
        });
      });
    }catch(error){}
  };

  return (
    <View style={styles.wrapper}>
    <DraggableGrid
      numColumns={4}
      renderItem={renderItem}
      data={images}
      onDragRelease={(newImages) => {
        setImages(newImages);
      }}
    />
    <Button title="+" onPress={pickImage} />
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
    paddingTop:100,
    width:'100%',
    height:'100%',
    justifyContent:'center',
  },
  item:{
    width:100,
    height:100,
    borderRadius:4,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
  },
  item_text:{
    fontSize:40,
    color:'#FFFFFF',
  },
});