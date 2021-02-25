import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Platform} from  'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as PlaceActions from '../../Store/Place-Actions';
import {useDispatch} from 'react-redux'
const placeRender = props=>{
    const dispatch = useDispatch();
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
        <Ionicons style={{alignSelf:"flex-end",marginBottom:14}} color="#28527a" name={Platform.OS==="android"?"ios-trash":"md-trash"} size={20} onPress={()=>dispatch(PlaceActions.deletePlaces(props.id))}/>
      </View>
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    placeItem: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingVertical: 15,
      paddingHorizontal: 30,
      flexDirection: 'row',
      alignItems: 'center'
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#ccc',
      borderColor: 'grey',
      borderWidth: 1
    },
    infoContainer: {
      marginLeft: 25,
      width: 250,
      justifyContent: 'center',
      alignItems: "flex-start"
    },
    title: {
      color: 'black',
      fontSize: 18,
      marginBottom: 5
    },
    address: {
      color: '#666',
      fontSize: 16
    }
  });
  export default placeRender;