import { apiSlice } from "../../app/services/apiSlice";

const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllRooms: builder.query({
            query: () => '/rooms',
            providesTags: ["rooms"]
        }),
        getAvailableCount: builder.query({
            query: () => '/rooms/available-count',
            providesTags: ["rooms"]
        }),
        getOccupationCount: builder.query({
            query: () => '/rooms/occupation-count',
            providesTags: ["rooms"]
        }),
        getRoomFilter: builder.query({
            query: ({type,status,floor}) => {
                const searchParams = new URLSearchParams();
                if(type) searchParams.append('type',type);
                if(status) searchParams.append('status',status);
                if(floor) searchParams.append('floor',floor);

                return `/rooms?${searchParams}`
            },
            providesTags: ["rooms"]
        }),
        addRoom: builder.mutation({
            query: (roomArr) => ({
              url: '/rooms',
              method: 'POST',
              body: {
                roomRequests: roomArr,
              },
            }),
            invalidatesTags:["rooms"]
          }),
        updateRoom: builder.mutation({
            query: ({id,number,type,floor}) => {
                console.log(id,number,type,floor);
                return ({
                    url: `/rooms/${id}`,
                    method: "PUT",
                    body: {
                       number,type,floor
                    }
                })
            },
            invalidatesTags:["rooms"]
        }),
        changeRoom: builder.mutation({
            query: ({id}) => {
                console.log(id);
                return  ({
                    url: '/rooms/available-rooms',
                    method: "POST",
                    body: {
                        reservationId:id
                    }
                })
            },
            invalidatesTags:["rooms"]
        }),
        getAvailableRoomsByReservationId: builder.query({
            query : (reservationId) => ({
                url : `/rooms/available-rooms/${reservationId}`,
                method : "GET",
            }),
            providesTags: ["reservations", "rooms", "roomTypes", "occupation"]
        }),
        maintainRoom: builder.mutation({
            query: ({id,isMaintained}) => {
                console.log(id,isMaintained);
                return ({
                    url: `/rooms/${id}/maintain`,
                    method: "PUT",
                    body: {
                        isMaintained: isMaintained
                    }
                })
            },
            invalidatesTags:["rooms"]
        }),
        checkInRoom: builder.mutation({
            query: ({id,reservationId}) => ({
                url: `/rooms/${id}/check-in`,
                method: "POST",
                body: {reservationId}
            }),
            invalidatesTags:["rooms", "reservations", "occupation", "roomTypes"]
        }),
        checkInReservedRoom: builder.mutation({
            query: (id) => ({
                url: `/reserved-rooms/${id}/check-in`,
                method: "PUT",
            }),
            invalidatesTags: ["rooms", "reservations", "occupation"]
        }),
        cancelReservedRoom: builder.mutation({
            query: (id) => ({
                url: `/reserved-rooms/${id}/cancel`,
                method: "PUT",
            }),
            invalidatesTags: ["rooms","reservations"]
        }),
    })
})

export const { useGetAvailableRoomsByReservationIdQuery, useGetAllRoomsQuery, useGetAvailableCountQuery, useGetOccupationCountQuery, useChangeRoomMutation, useAddRoomMutation, useGetRoomFilterQuery, useUpdateRoomMutation, useMaintainRoomMutation, useCheckInRoomMutation, useCheckInReservedRoomMutation, useCancelReservedRoomMutation} = roomApiSlice;