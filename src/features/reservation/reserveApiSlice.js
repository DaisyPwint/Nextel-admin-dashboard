import { getStatusClassNames } from "antd/es/_util/statusUtils";
import { apiSlice } from "../../app/services/apiSlice";

const reserveApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['reservations'],
    endpoints: (builder) => ({
        newReserve: builder.query({
            query: () => '/reservations/count',
            providesTags: ['reservations'],
        }),
        getFilterRoom: builder.query({
            query: ({year,month}) => `/reserved-rooms/month?month=${month}&year=${year}`,
            providesTags: ['reservations'],
        }),
        getDailyIncome: builder.query({
            query: ({year,month}) => `/reservations/daily-income?month=${month}&year=${year}`,
            providesTags: ['reservations'],
        }),
        getReservations: builder.query({
            query: () => '/reservations',
            providesTags: ['reservations'],
        }),
        getReserveById : builder.query({
            query: (id) => `/reservations/${id}`,
            providesTags: ['reservations'],
        }),
        getCompletedReservations: builder.query({
            query: () => '/reservations/completed',
            providesTags: ['reservations'],
        }),
        getCompletedReservationsById: builder.query({
            query: (id) => `/reservations/completed/${id}`,
            providesTags: ['reservations'],
        }),
        getReservationByFilter: builder.query({
            query: ({ monthFilter, status, reservationDate, checkInDate, checkOutDate }) => {
                console.log(monthFilter, status, reservationDate, checkInDate, checkOutDate);
                const searchParams = new URLSearchParams();
        
                if (monthFilter) {
                    searchParams.append('monthFilter', monthFilter);
                }
        
                if (status) {
                    searchParams.append('status', status);
                }
        
                if (reservationDate) {
                    searchParams.append('reservationDate', reservationDate);
                }
        
                if (checkInDate) {
                    searchParams.append('checkInDate', checkInDate);
                }
        
                if (checkOutDate) {
                    searchParams.append('checkOutDate', checkOutDate);
                }        
                return `/reservations?${searchParams}`;
            },
            providesTags: ['reservations'],
        }),
        updateStatus: builder.mutation({
            query: ({id,status}) => {
                console.log(id,status);
                return ({
                    url: `/reservations/${id}`,
                    method: "PUT",
                    body: {
                        status: status
                    }
                })
            },
            invalidatesTags: ["reservations"]
        }),        
        checkExpReservations: builder.mutation({
            query: () => ({
                url: 'reservations/refresh',
                method: "PUT",
            }),
            invalidatesTags: ['reservations'],
        }),      
          
    }),
});

export const {useGetCompletedReservationsByIdQuery , useNewReserveQuery,useGetFilterRoomQuery,useGetDailyIncomeQuery,useGetReservationsQuery,useGetReserveByIdQuery,useGetReservationByFilterQuery, useUpdateStatusMutation, useGetCompletedReservationsQuery,useCheckExpReservationsMutation } = reserveApiSlice;
