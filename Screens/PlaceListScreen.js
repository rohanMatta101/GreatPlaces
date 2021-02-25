import React,{useEffect} from 'react';
import {View,FlatList} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../Components/UI/customHeaderButtons';
import {connect,useDispatch} from 'react-redux';
import PlaceRender from '../Components/Places/PlaceRender';
import * as PlaceActions from '../Store/Place-Actions';


const placeListScreen = props=>{
    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(PlaceActions.loadPlaces());

    },[dispatch])
    return (
        <View>
            <FlatList data={props.places} keyExtractor={item=>item.id} renderItem={itemData=><PlaceRender id={itemData.item.id} image={itemData.item.imageUri} address={itemData.item.address} title={itemData.item.title} onSelect={()=>props.navigation.navigate('PlaceDetail',{
                placeTitle : itemData.item.title,
                placeId : itemData.item.id
            })}/>
            }/>
        </View>
    )
}
placeListScreen.navigationOptions = navData=>{
    return {
        headerTitle : 'All Places',
        headerRight : <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item title="title"  iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={()=>{navData.navigation.navigate('NewPlace')}}/>
    </HeaderButtons>,
    }
}

const mapStateToProps = state=>{
  return {
      places : state.places.places
  }
}
export default connect(mapStateToProps)(placeListScreen)