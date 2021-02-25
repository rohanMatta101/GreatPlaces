
import React from 'react';
import PlaceNavigator from './Navigation/PlaceNavigator';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import PlaceReducer from './Store/Place-Reducer';
import {init} from './Helpers/db';
init().then(()=>{
  console.log('initialising DB')
}).catch(err=>{
  console.log('initialising DB Failed');
})
const rootReducer=combineReducers({
  places : PlaceReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
        <PlaceNavigator />
    </Provider>
    
  );
}

