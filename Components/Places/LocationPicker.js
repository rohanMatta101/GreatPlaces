import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Alert,Button,ActivityIndicator} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapPreview from '../Places/MapPreview';
const locationPicker = (props)=>{
    const [pickedLocation,setLocation] = useState();
    const mapPickedLocation = props.navigation.getParam('savedLocation');
    const {onLocationPick}=props;
    useEffect(()=>{ //as we also have the functionality to pick location from the map we are storing it here also to show it's map preview
       //Data being passed from Map Screen
       if(mapPickedLocation)
       {
           setLocation(mapPickedLocation);
       }
       onLocationPick(mapPickedLocation);//passing this data to new Place screen
    },[mapPickedLocation,onLocationPick]);

    const [isLoading,setLoading]=useState(false);
    const verifyPermissions = async() =>{
        const result = await Permissions.askAsync(Permissions.LOCATION); //returns promise as this action is async
        if(result.status!== 'granted')
        {
            Alert.alert('Insufficient Permissions','Grant Permissions to continue',[{
                text : 'Okay'
            }])
            return false;
        }
        return true;
    }
    const getLocation = async ()=>{
        const hasPerm = await  verifyPermissions();
        if(!hasPerm)
        {
            return;
        }
        try{
            setLoading(true);
            const location = await Location.getCurrentPositionAsync({timeout : 5000});
            console.log(location);
            setLocation({
                lat : location.coords.latitude,
                lng : location.coords.longitude
            });
            onLocationPick({ //passing this data to new Place screen
                lat : location.coords.latitude,
                lng : location.coords.longitude
            });
        }catch(err){
              Alert.alert('Could not Fetch Location','Please Try Again',[{
                  text:'Okay'
              }])
        }
        setLoading(false);
        

    }
    const pickOnMap = ()=>{
        props.navigation.navigate('Map')
    }
    return (
        <View style={styles.locationPicker}>
            <MapPreview location={pickedLocation}>
           <View style={styles.mapPreview}>
           {isLoading ? <ActivityIndicator size="large" color="#28527a"/> : <Text>No location Selected</Text>}
           </View>
           </MapPreview>
           <View style={styles.buttons}>
           <Button title="Get User Location" color="#28527a" onPress={getLocation}/>
           <Button title="Pick Up On Map" color="#28527a" onPress={pickOnMap}/>
           </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
    locationPicker: {
      marginBottom: 15
    },
    mapPreview: {
      marginBottom: 10,
      width: '100%',
      height: 200,
      borderColor: '#ccc',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
  });
  
export default locationPicker;