import React,{useState} from 'react';
import {View,Text,StyleSheet, Image, Button,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const imgPicker = props=>{
    const [pickedImage,setPickedImage]=useState();
    const verifyPermissions = async() =>{
        const result = await Permissions.askAsync(Permissions.CAMERA); //returns promise as this action is async
        if(result.status!== 'granted')
        {
            Alert.alert('Insufficient Permissions','Grant Permissions to continue',[{
                text : 'Okay'
            }])
            return false;
        }
        return true;
    }
    const takeImageHandler = async()=>{
        const hasPerm = await verifyPermissions();
        if(!hasPerm)
        {
           return;
        }
        const imagePicked = await ImagePicker.launchCameraAsync({ //retuns promise as this action is async
            aspect:[16,9],
            allowsEditing:true,
            quality:0.5
        });
        
        setPickedImage(imagePicked.uri);
        props.onTaken(imagePicked.uri)
    }
   return (
       <View style={styles.imagePicker}>
           <View style={styles.imagePreview}>
               {!pickedImage ? 
               <View style={{marginTop:26}}>
               <Text>No Image Picked yet</Text>
               <Button title="Take An Image" color="#28527a" onPress={takeImageHandler}/>
               </View>:
               <Image style={styles.image} source={{uri:pickedImage}}/>}
               
           </View>
       </View>
   )
}
const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
      },
      imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
      },
      image: {
        width: '100%',
        height: '100%',
        
      }
})
export default imgPicker;
//source={{uri:pickedImage.uri}}