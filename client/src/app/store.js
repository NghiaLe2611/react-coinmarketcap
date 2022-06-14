import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import generalReducer from "../features/general/generalSlice";
import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
    generalCoinStats: generalReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);