import React from 'react';
import {Image,StyleSheet,View} from 'react-native';
const mapPreview = props=>{
    let mapImagePreview;
    if(props.location){
        mapImagePreview = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${props.location.lng},${props.location.lat}&zoom=14.3&marker=lonlat:${props.location.lng},${props.location.lat};color:%23ff0000;size:large&apiKey=0b0b61c959234006b4611af04c757a93`
    }
    //console.log(mapImagePreview);  
  return(
  <View style={props.style ? props.style:styles.mapPreview }>
    {props.location ? <Image style={styles.mapImage} source={{uri : mapImagePreview}}/> : props.children}
  </View>)
}
const styles = StyleSheet.create({
    mapPreview:{
      marginBottom: 10,
      width: '100%',
      height: 200,
      borderColor: '#ccc',
      borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage:{
     width:'100%',
     height: 200
    }

})
export default mapPreview;