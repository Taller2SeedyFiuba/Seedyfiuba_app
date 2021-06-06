import * as React from 'react';
import { Button, Image, View, Platform, StyleSheet, FlatList } from 'react-native';
import { Text, Avatar, Card, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ProgressBar } from 'react-native-paper';
import * as Auth from './../providers/auth-provider.js';

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


function renderItem({item}){
  return (
    <View style={{aspectRatio:1}}>
      <Card style={{width:200}}>
        <Card.Content>
          <Card.Cover source={{ uri: item.uri }} />
        </Card.Content>
      </Card>
    </View>
  );
};

export function ImagePickerExample({navigation}) {
  const [transferred, setTransferred] = React.useState(0);
  const [images, setImage] = React.useState([
  {
    id: '1',
    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Raunkiaer.jpg'
  },
  {
    id: '2',
    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Raunkiaer.jpg'
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
          setImage(copy);
        });
      });
    }catch(error){}
  };

  return (
    <View>
      <FlatList
        data={images}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
        horizontal = {true}
        //extraData={selectedId}
      />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="+" onPress={pickImage} />
      <ProgressBar progress={transferred} />
    </View>
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
})