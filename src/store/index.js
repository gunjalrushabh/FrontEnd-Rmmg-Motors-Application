import userReducer from "./reducers/user";
import {configureStore} from '@reduxjs/toolkit';
// import {combineReducers,createStore} from 'redux';
// const allReducers=combineReducers({
//     user: userReducer,
// })

// const store=createStore(allReducers);

 const store=configureStore({
    reducer:{
        user: userReducer,
    }
});

export default store;

 