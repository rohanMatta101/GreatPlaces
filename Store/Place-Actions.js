import * as FileSystem from 'expo-file-system';
export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';
//export const DELETE_PLACE = 'DELETE_PLACE';
import {insertPlace,fetchPlaces,deletePlace} from '../Helpers/db'
export const addPlace = (title,image,location)=>{

    
    const filename = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + filename;
    return async(dispatch)=>{
        //we are doing reverse geocoding where we are converting lat and long into human readble address by sending our lat and lng to this link
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&lang=de&limit=10&apiKey=0b0b61c959234006b4611af04c757a93`);
        if(!response.ok)
        {
            throw new Error('Something went wrong');
        }
        const result = await response.json();
        if(!result.features[0])
        {
            throw new Error('Something went wrong');
        }
        
        const address = result.features[0].properties.formatted
        
     try{
         await FileSystem.moveAsync({
             from:image,
             to : newPath
         })
         const dbResult = await insertPlace(title,newPath,address,location.lat,location.lng);//inserting new place into the SQL table
         //console.log(dbResult);
         dispatch({
            type: ADD_PLACE,
           placeData:{
            id:dbResult.insertId,
            title : title,
            image : newPath,
            address:address,
            Coordinates:{
                lat : location.lat,
                lng : location.lng
            }
           }
        })

     }catch(err)
     {
         throw new Error('Something went wrong');
     }
        
    }
}
export const loadPlaces = ()=>{ //loading Data from DATABase
  return async dispatch=>{
      const dbResult = await fetchPlaces();
      //console.log(dbResult);
      dispatch({
          type : SET_PLACE,
          places : dbResult.rows._array
      })
  }
}
export const deletePlaces=id=>{
  return async dispatch=>{
      console.log("deleting")
      await deletePlace(id);
      const dbResult = await fetchPlaces();
      //console.log(dbResult);
      dispatch({
          type : SET_PLACE,
          places : dbResult.rows._array
      })
  }
}