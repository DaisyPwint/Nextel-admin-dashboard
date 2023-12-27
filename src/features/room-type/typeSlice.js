import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    types : [
        {
            "id": 1,
            "name": "Deluxe Single",
            "maximumCapacity": 1,
            "size": "50",
            "pricePerNight": 100,
            "description": "Our Deluxe Single Room offers a plush single bed with high-quality linens for a restful sleep. It includes a work desk, complimentary Wi-Fi, and an en-suite bathroom with premium toiletries. Additional amenities include a flat-screen TV, mini-bar, in-room safe, and 24-hour room service. Experience comfort and convenience in the heart of the city.",
            "totalRoom": 8,
            "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "amenities": [2,3
                // {
                //     "id": 1,
                //     "name": "Comfortable Beds",
                //     "icon": "bed"
                // },
                // {
                //     "id": 2,
                //     "name": "Private Bathroom",
                //     "icon": "bathroom"
                // },
                // {
                //     "id": 3,
                //     "name": "Garden View",
                //     "icon": "home_and_garden"
                // },
                // {
                //     "id": 20,
                //     "name": "Laundry Facilities",
                //     "icon": "Laundry Facilities"
                // },
                // {
                //     "id": 21,
                //     "name": "Ironing Facilities",
                //     "icon": "Ironing Facilities"
                // },
                // {
                //     "id": 28,
                //     "name": "In-Room Jacuzzi",
                //     "icon": "In-Room Jacuzzi"
                // }
            ]
        },
        {
            "id": 2,
            "name": "Deluxe Double",
            "maximumCapacity": 2,
            "size": "80",
            "pricePerNight": 200,
            "description": "The Deluxe Single Room, with its king-sized bed and high-quality linens, ensures a restful sleep. It includes a modern bathroom, a seating area, and a flat-screen TV. Complimentary Wi-Fi, a stocked mini-bar, and a safe are also provided. Large windows offer city views. Guests have access to 24-hour room service. This room is a blend of comfort and luxury, perfect for both business and leisure stays.",
            "totalRoom": 20,
            "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "amenities": [2,6
                // {
                //     "id": 1,
                //     "name": "Comfortable Beds",
                //     "icon": "bed"
                // },
                // {
                //     "id": 6,
                //     "name": "Private Meeting Room",
                //     "icon": "meeting_room"
                // },
                // {
                //     "id": 10,
                //     "name": "Room Service",
                //     "icon": "Room Service"
                // },
                // {
                //     "id": 28,
                //     "name": "In-Room Jacuzzi",
                //     "icon": "In-Room Jacuzzi"
                // }
            ]
        }
    ]
}

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        addType: (state,{payload}) => {
            return {
                ...state,
                types: [...state.types,payload]
            }
        },
        editType: (state,{payload}) => {
            const { typeId: id, ...restPayload } = payload;
            return {
                ...state,
                types: state.types.map(type => (type.id === id ? { ...type, ...restPayload } : type)),
            };
        }
    }
})

export const {addType,editType} = typeSlice.actions;

export default typeSlice.reducer;

export const selectAllTypes = (state) => state.type.types;

export const selectTypeById = (state,typeId) => state.type.types.find((type) => type.id === typeId);

