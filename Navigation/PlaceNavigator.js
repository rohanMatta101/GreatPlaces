import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PlaceListScreen from '../Screens/PlaceListScreen';
import PlaceDetailScreen from '../Screens/PlaceDetailScreen';
import NewPlaceScreen from '../Screens/NewPlaceScreen';
import MapScreen from '../Screens/MapScreen';

const placeNavigator  = createStackNavigator({
  PlaceList : PlaceListScreen,
  PlaceDetail : PlaceDetailScreen,
  NewPlace : NewPlaceScreen,
  Map : MapScreen
},{
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor:'#28527a'
    },
    headerTintColor:'white',
    
  }
})
export default createAppContainer(placeNavigator);