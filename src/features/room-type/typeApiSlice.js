import { apiSlice } from "../../app/services/apiSlice";

const typeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoomType: builder.query({
            query: () => '/room-types',
            providesTags: ["roomTypes"]
        }),
        getRoomTypeById: builder.query({
            query: (id) => `room-types/${id}`,            
            providesTags: ["roomTypes"]
        }),
        addRoomType: builder.mutation({
            query: (newType) => ({
                url: '/room-types',
                method: "POST",
                body: newType
            }),
            invalidatesTags: ["roomTypes"]
        }),
        editRoomType: builder.mutation({
            query: (updatedType) => ({
                url: `/room-types/${id}`,
                method: "PUT",
                body: updatedType
            }),
            invalidatesTags: ["roomTypes"]
        }),
        getAmenities: builder.query({
            query: () => '/amenities',
            providesTags: ["roomTypes"]
        })
    })
})

export const { useGetRoomTypeQuery, useGetRoomTypeByIdQuery, useAddRoomTypeMutation, useEditRoomTypeMutation, useGetAmenitiesQuery} = typeApiSlice;