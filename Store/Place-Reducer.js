import { ActionSheetIOS } from 'react-native';
import Place from '../Model/Place';
import {ADD_PLACE,SET_PLACE,DELETE_PLACE} from './Place-Actions';
const initialState={
    places : []
}
export default (state=initialState,action)=>{
    switch(action.type)
    {
        case SET_PLACE: //fetching our DATA from local database
            return{
                ...state,
                places : action.places.map(place=>new Place(place.id.toString(),place.title,place.imageUri,place.address,place.lat,place.lng))
            }
        case ADD_PLACE:
            const newPlace = new Place(action.placeData.id,action.placeData.title,action.placeData.image,action.placeData.address,action.placeData.Coordinates.lat,action.placeData.Coordinates.lng);
            return {
                ...state,
               places : state.places.concat(newPlace)
            }
        case DELETE_PLACE:
            return{
                ...state,
                places : action.places
            }
        default :
           return state;    
    }
}
/*case DELETE_PLACE:
            return {
                ...state,
                places : action.places.map(place=>new Place(place.id.toString(),place.title,place.imageUri,place.address,place.lat,place.lng))
            }    */