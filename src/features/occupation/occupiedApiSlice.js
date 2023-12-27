import { apiSlice } from "../../app/services/apiSlice";

const occupiedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOccupiedRoom: builder.query({
            query: () => '/occupied-rooms',
            providesTags: ["occupation"]
        }),
        getOccupiedByFilter: builder.query({
            query: ({monthFilter,type,checkInDate,checkOutDate}) => {
                const searchParams = new URLSearchParams();

                if(monthFilter) searchParams.append('monthFilter',monthFilter);
                if(type) searchParams.append('type',type);
                if(checkInDate) searchParams.append('checkInDate',checkInDate);
                if(checkOutDate) searchParams.append('checkOutDate',checkOutDate);

                return `/occupied-rooms?${searchParams}`
            },
            providesTags: ["occupation"]
        }),
        getOccupationHistory: builder.query({
            query: () => '/occupied-rooms/history',
            providesTags: ["occupation"]
        }),
        checkOutOccupiedRoom: builder.mutation({
            query: (id) => ({
                url: `/occupied-rooms/${id}/check-out`,
                method: "PUT",
            }),
            invalidatesTags: ["occupation"]
        }),
        // getHistoryFilter: builder.query({
        //     query: ({type,status,floor}) => {
        //         const searchParams = new URLSearchParams();
        //         if(type) searchParams.append('type',type);
        //         if(status) searchParams.append('status',status);
        //         if(floor) searchParams.append('floor',floor);

        //         return `/rooms?${searchParams}`
        //     },
        //     providesTags: ["occupation"]
        // }),        
    })
})

export const { useGetOccupiedRoomQuery,useGetOccupiedByFilterQuery,useGetOccupationHistoryQuery, useCheckOutOccupiedRoomMutation} = occupiedApiSlice;