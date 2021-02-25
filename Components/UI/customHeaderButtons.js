import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons' 

const customHeaderButtons=(props)=>{
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color="white"/>
}
export default customHeaderButtons