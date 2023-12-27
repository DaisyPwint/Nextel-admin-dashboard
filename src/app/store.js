import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authReducer from "../features/auth/authSlice";
import typeReducer from '../features/room-type/typeSlice';
import roomReducer from "../features/room/roomSlice";
import reserveReducer from "../features/reservation/reserveSlice";
import occupiedReducer from "../features/occupation/occupiedSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        type: typeReducer,
        room: roomReducer,
        reserve: reserveReducer,
        occupy: occupiedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;