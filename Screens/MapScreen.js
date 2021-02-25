import React,{useState,useCallback,useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView,{Marker} from 'react-native-maps';//when using this package to render map screen always give styling else no MAP WILL DISPLAY
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../Components/UI/customHeaderButtons';
const MapScreen = props=>{
    const [selectedLocation,setSelectedLocation]=useState();
    
    
    const mapRegion={ //a MUST pass argument into MapView component
        latitude : 37.78,
        longitude : -122.43,
        latitudeDelta : 0.0922,
        longitudeDelta: 0.0421
    }
    const onMapPress = event=>{ //on pressing the map we use this to store the location of the area pressed
        console.log(event);
        setSelectedLocation({
            lat : event.nativeEvent.coordinate.latitude,
            lng : event.nativeEvent.coordinate.longitude
        })
    }
    //saving the location picked through marker by passing reference to this fxn in the navigationOptions
    const savePickedLocation = useCallback(()=>{
         if(!selectedLocation)
         {
             return;
         }
         props.navigation.navigate('NewPlace',{
             savedLocation : selectedLocation
         })
    },[selectedLocation]);
    useEffect(()=>{
        props.navigation.setParams({saveLocation : savePickedLocation})
    },[savePickedLocation])
    //
    let markerCoord;
    if(selectedLocation)
    {
         markerCoord = {
            latitude : selectedLocation.lat, //keep the names latitute and longitude only
            longitude : selectedLocation.lng
        }
    }
    return (
        <MapView style={styles.map} region={mapRegion} onPress={onMapPress}>
            {markerCoord &&   <Marker title="Picked Location" coordinate={markerCoord} />}
        </MapView> 
    )
}
const styles  = StyleSheet.create({
   map:{
       flex:1
   }
})
MapScreen.navigationOptions = navData=>{
    const saveFxn = navData.navigation.getParam('saveLocation');//Pointing to the savePickedLocation 
    return {
        headerTitle : 'Map',
        headerRight : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item title="Save"  iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'} onPress={saveFxn} />
    </HeaderButtons>
    }
}
export default MapScreen;