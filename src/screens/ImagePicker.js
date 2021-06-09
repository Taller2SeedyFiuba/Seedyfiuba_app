import * as React from 'react';
import {ImagePickerComponent} from '../components/ImagePickerComponent.js';

export function ImagePickerExample({navigation}) {
  const [images, setImages] = React.useState([]);
  return <ImagePickerComponent output = {setImages}/>
}