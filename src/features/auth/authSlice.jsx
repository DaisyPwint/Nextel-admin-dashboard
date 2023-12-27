import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const initialState = {
    token
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state,{payload}) => {
            console.log(payload);
            const {token} = payload;
            Cookies.set('token',token);
            state.token = token;
        },
        logout: (state) => {
            Cookies.remove('token');
            state.token = null
        }        
    }
})

export const {setCredentials,logout} = authSlice.actions;

export default authSlice.reducer;