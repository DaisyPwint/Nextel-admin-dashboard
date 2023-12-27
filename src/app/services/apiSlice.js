import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.110.194:8080/api',
        // baseUrl: 'https://2110-104-28-251-152.ngrok-free.app/api',
        credentials: 'include',
        prepareHeaders: ((headers,{getState}) => {
            // headers.set("Access-Control-Allow-Origin", "*");
            // return headers;
            const token = getState().auth.token;
            if(token){
                headers.set('authorization',`Bearer ${token}`)
                return  headers
            }
            
        })
    }),
    tagTypes:["reservations","roomTypes","rooms","occupation"],
    endpoints: () => ({})
})