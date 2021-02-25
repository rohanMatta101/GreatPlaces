import React from 'react';
import {View,Text,ScrollView,Image,StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import MapPreview from '../Components/Places/MapPreview'; 
const placeDetailScreen = props=>{
    const placeId = props.navigation.getParam('placeId');
    const place = props.Places.find(place=>place.id === placeId);
    return (
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
          <Image source={{uri:place.imageUri}} style={styles.image}/>
          <View  style={styles.locationContainer}>
              <View style={styles.addressContainer}><Text style={styles.address}>{place.address}</Text></View>
              <MapPreview style={styles.mapPreview} location={{lat:place.lat,lng:place.lng}}/>
          </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
      },
      locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
      },
      addressContainer: {
        padding: 20
      },
      address: {
        color: "blue",
        textAlign: 'center'
      },
      mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      }
})
placeDetailScreen.navigationOptions = navData=>{
    return {
        headerTitle : navData.navigation.getParam('placeTitle')

    }
}
const mapStateToProps=state=>{
    return {
        Places : state.places.places
    }
}

export default connect(mapStateToProps)(placeDetailScreen);