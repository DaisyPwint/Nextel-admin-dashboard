import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkInRooms: [
        {
            "id": 1,
            "reservationId": 3,
            "guestName": "Jane",
            "guestPhone": "+959123456789",
            "guestEmail": "jane@example.com",
            "roomNumber": 101,
            "roomType": "Deluxe Single",
            "checkIn": "2023-11-08T08:05:00Z",
            "checkOut": "2023-11-09T09:28:30Z",
            "status": "CHECKED_IN"
        },
        {
            "id": 3,
            "reservationId": 3,
            "guestName": "chris",
            "guestPhone": "+959123456789",
            "guestEmail": "chris@example.com",
            "roomNumber": 102,
            "roomType": "Deluxe Double",
            "checkIn": "2023-11-15T08:05:00Z",
            "checkOut": "2023-11-15T09:28:30Z",
            "status": "CHECKED_IN"
        }
    ],
    checkOutRooms: []
}

const occupiedSlice = createSlice({
    name: 'occupy',
    initialState,
    reducers: {
        checkOut: (state,{payload}) => {
            const checkOutRoom = state.checkInRooms.find(room => room.id === payload);
            return {
                ...state,
                checkInRooms: state.checkInRooms.filter(room => room.id !== payload),
                checkOutRooms: [...state.checkOutRooms,checkOutRoom]
            }
        }
    }
})

export const {checkOut} = occupiedSlice.actions;

export default occupiedSlice.reducer;

export const occupiedRooms = (state) => state.occupy.checkInRooms;
export const occupiedHistory = (state) => state.occupy.checkOutRooms;