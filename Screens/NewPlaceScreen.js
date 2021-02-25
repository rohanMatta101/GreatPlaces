import React,{useState,useCallback} from 'react';
import {View,Text,StyleSheet,TextInput,Button,ScrollView} from 'react-native';
import * as PlaceActions from '../Store/Place-Actions';
import {useDispatch} from 'react-redux';
import ImagePicker from '../Components/Places/ImagePicker';
import LocationPicker from '../Components/Places/LocationPicker';

const newPlaceScreen = props=>{
    const dispatch = useDispatch();
    const [title,setTitle]=useState('');
    const [selectedImage,setSelectedImage]=useState();
    const [pickedLoc,setLoc]=useState();
    const setImageHandler=imagePath=>{//this fxn is passed as a refernce to the image picker constant
        setSelectedImage(imagePath);
    }
    const saveLocation = useCallback(loc=>{ //saving locatin either by getting user location or the user manually picking tht location from the map 
        console.log(loc);
        setLoc(loc);
    },[setLoc])
    const savePlaceHandler=()=>{
       //console.log('Saved');
       dispatch(PlaceActions.addPlace(title,selectedImage,pickedLoc));
       props.navigation.navigate('PlaceList');
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <ImagePicker onTaken={setImageHandler}/>
                <LocationPicker navigation={props.navigation} onLocationPick={saveLocation}/>
                <View style={{marginTop:20}}>
                <Text style={styles.text}>Add Title</Text>
                <TextInput style={styles.input} onChangeText={text=>setTitle(text)} value={title}/>
                <Button title="Save Place" color="#28527a" onPress={savePlaceHandler} />
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    form:{
       margin:20
    },
    text:{
      fontSize : 24,
      margin:10,
      color:"#28527a"
    },
    input:{
        borderBottomWidth:1.5,
        margin:10,
        color:"#28527a"
    }

})
newPlaceScreen.navigationOptions = navData=>{
    return {
        headerTitle : 'Add Place'
    }
}
export default newPlaceScreen;