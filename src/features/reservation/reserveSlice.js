import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reservations : [
        {
            "id": 7,
            "reservationId": "00007",
            "guestName": "Miami",
            "guestEmail": "miami@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 4,
            "totalRoom": 3,
            "checkIn": "2023-11-18T07:30:00Z",
            "checkOut": "2023-11-19T05:30:00Z",
            "createdAt": "2023-11-15T03:26:33Z",
            "lengthOfStay": 1,
            "totalCost": 1500,
            "status": "PENDING",
            "reservedRooms": [
                {
                    "id": 9,
                    "roomNumber": 101,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "PENDING"
                },
                {
                    "id": 10,
                    "roomNumber": 102,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "PENDING"
                },
                {
                    "id": 11,
                    "roomNumber": 201,
                    "roomType": "Deluxe Double",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 200,
                    "status": "PENDING"
                }
            ],
            "selectedRooms": null,
            "specialRequest": "Need rooms with a city view."
        },
        {
            "id": 3,
            "reservationId": "00003",
            "guestName": "Jane",
            "guestEmail": "jane@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 4,
            "totalRoom": 3,
            "checkIn": "2023-11-15T07:30:00Z",
            "checkOut": "2023-11-16T05:30:00Z",
            "createdAt": "2023-11-03T03:22:56Z",
            "lengthOfStay": 1,
            "totalCost": 1500,
            "status": "PENDING",
            "reservedRooms": [
                {
                    "id": 9,
                    "roomNumber": 101,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "PENDING"
                },
                {
                    "id": 10,
                    "roomNumber": 102,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "PENDING"
                },
                {
                    "id": 11,
                    "roomNumber": 201,
                    "roomType": "Deluxe Double",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 200,
                    "status": "PENDING"
                }
            ],
            "selectedRooms": null,
            "specialRequest": "Need rooms with a city view."
        },
        {
            "id": 13,
            "reservationId": "00013",
            "guestName": "Chicago",
            "guestEmail": "chicago@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 3,
            "totalRoom": 2,
            "checkIn": "2023-11-16T07:30:00Z",
            "checkOut": "2023-11-17T05:30:00Z",
            "createdAt": "2023-10-15T03:10:42Z",
            "lengthOfStay": 3,
            "totalCost": 1200,
            "status": "CONFIRMED",
            "reservedRooms": [
                {
                    "id": 1,
                    "roomNumber": 101,
                    "roomType": "Deluxe Single",
                    "checkIn": "2023-11-16T07:03:41Z",
                    "checkOut": "2023-11-18T05:30:00Z",
                    "pricePerNight": 400,
                    "status": "CONFIRMED"
                },
                {
                    "id": 2,
                    "roomNumber": 102,
                    "roomType": "Deluxe Single",
                    "checkIn": "2023-11-16T07:03:46Z",
                    "checkOut": "2023-11-18T05:30:00Z",
                    "pricePerNight": 500,
                    "status": "CONFIRMED"
                }
            ],
            "specialRequest": "Need rooms with a city view."
        },
        {
            "id": 16,
            "reservationId": "00016",
            "guestName": "Tanak",
            "guestEmail": "tanaka@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 4,
            "totalRoom": 3,
            "checkIn": "2023-11-01T07:30:00Z",
            "checkOut": "2023-11-05T05:30:00Z",
            "createdAt": "2023-11-15T03:26:33Z",
            "lengthOfStay": 1,
            "totalCost": 1500,
            "status": "CANCELED",
            "reservedRooms": [
                {
                    "id": 13,
                    "roomNumber": 113,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "CANCELED"
                },
                {
                    "id": 14,
                    "roomNumber": 114,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "CANCELED"
                },
                {
                    "id": 15,
                    "roomNumber": 115,
                    "roomType": "Deluxe Double",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 200,
                    "status": "CANCELED"
                }
            ],
            "selectedRooms": null,
            "specialRequest": "Need rooms with a city view."
        },
        {
            "id": 5,
            "reservationId": "00005",
            "guestName": "John",
            "guestEmail": "john@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 4,
            "totalRoom": 3,
            "checkIn": "2023-11-18T07:30:00Z",
            "checkOut": "2023-11-19T05:30:00Z",
            "createdAt": "2023-11-15T03:26:33Z",
            "lengthOfStay": 1,
            "totalCost": 1500,
            "status": "EXPIRED",
            "reservedRooms": [
                {
                    "id": 16,
                    "roomNumber": 201,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "PENDING"
                },
                {
                    "id": 17,
                    "roomNumber": 202,
                    "roomType": "Deluxe Single",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 100,
                    "status": "PENDING"
                },
                {
                    "id": 18,
                    "roomNumber": 203,
                    "roomType": "Deluxe Double",
                    "reservationId": 7,
                    "checkIn": "2023-11-18T07:30:00Z",
                    "checkOut": "2023-11-19T05:30:00Z",
                    "pricePerNight": 200,
                    "status": "PENDING"
                }
            ],
            "selectedRooms": null,
            "specialRequest": "Need rooms with a city view."
        }
    ],
    completedReservations: [
        {
            "id": 2,
            "reservationId": "00002",
            "guestName": "Lily",
            "guestEmail": "lily@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 3,
            "totalRoom": 2,
            "checkIn": "2023-11-16T07:30:00Z",
            "checkOut": "2023-11-18T05:30:00Z",
            "createdAt": "2023-10-02T03:10:42Z",
            "lengthOfStay": 3,
            "totalCost": 1200,
            "status": "COMPLETED",
            "occupiedRooms": [
                {
                    "id": 6,
                    "roomNumber": 106,
                    "roomType": "Deluxe Single",
                    "checkIn": "2023-11-16T07:03:41Z",
                    "checkOut": "2023-11-18T05:30:00Z",
                    "status": "CHECKED_IN"
                },
                {
                    "id": 7,
                    "roomNumber": 107,
                    "roomType": "Deluxe Single",
                    "checkIn": "2023-11-16T07:03:46Z",
                    "checkOut": "2023-11-18T05:30:00Z",
                    "status": "CHECKED_IN"
                }
            ],
            "specialRequest": "Need rooms with a city view."
        },
        {
            "id": 3,
            "reservationId": "00003",
            "guestName": "Sue",
            "guestEmail": "sue@example.com",
            "guestPhone": "+959123456789",
            "guestAddress": "123, ABC Street, Mandalay, Myanmar",
            "numberOfGuest": 3,
            "totalRoom": 2,
            "checkIn": "2023-11-10T07:30:00Z",
            "checkOut": "2023-11-12T05:30:00Z",
            "createdAt": "2023-10-05T03:10:42Z",
            "lengthOfStay": 3,
            "totalCost": 1200,
            "status": "COMPLETED",
            "occupiedRooms": [
                {
                    "id": 2,
                    "roomNumber": 106,
                    "roomType": "Deluxe Single",
                    "checkIn": "2023-11-16T07:03:41Z",
                    "checkOut": "2023-11-18T05:30:00Z",
                    "status": "CHECKED_IN"
                },
                {
                    "id": 3,
                    "roomNumber": 107,
                    "roomType": "Deluxe Single",
                    "checkIn": "2023-11-16T07:03:46Z",
                    "checkOut": "2023-11-18T05:30:00Z",
                    "status": "CHECKED_IN"
                }
            ],
            "specialRequest": "Need rooms with a city view."
        }
    ]
}

const updateReservations = (reservations,id,status) => {
    return reservations.map(reserve => {
        if(reserve.id === id){
            const updatedReservedRooms = reserve.reservedRooms.map(room => (
                {
                    ...room,
                    status : status,
                }
            ))
            return {
                ...reserve,
                status: status,
                reservedRooms: updatedReservedRooms
            }
        }
        return reserve
    })
}

const updateReservedRooms = (reservations,id,status) => {
    return reservations.map(reserve => {
        const updatedReservedRooms = reserve.reservedRooms.map(room => (room.id === id ? {...room,status} : room))        
        return {
            ...reserve,
            reservedRooms: updatedReservedRooms
        }
    })
}

const reserveSlice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        confirm: (state,{payload}) => {
            const {reservations} = state;
            const updatedReservations = updateReservations(reservations,payload.reserveId,payload.status);
            
            return {
                ...state,
                reservations: updatedReservations
            }
        },
        cancelReservation: (state,{payload}) => {
            const {reservations} = state;
            console.log(payload);
            const updatedReservations = updateReservations(reservations,payload.reserveId,payload.status);

            return {
                ...state,
                reservations: updatedReservations
            }  
        },
        checkIn: (state,{payload}) => {
            const {reservations} = state;
            const updatedReservedRooms = updateReservedRooms(reservations,payload.reserveId,payload.status);

            return {
                ...state,
                reservations: updatedReservedRooms
            }
        },
        cancelRoom: (state,{payload}) => {
            const {reservations} = state;
            const updatedReservedRooms = updateReservedRooms(reservations,payload.reserveId,payload.status);

            return {
                ...state,
                reservations: updatedReservedRooms
            }
        }
    }
})

export const {confirm,cancelReservation,checkIn,cancelRoom} = reserveSlice.actions;

export default reserveSlice.reducer;

export const reservations = state => state.reserve.reservations;
export const reservationById = (state,id) => state.reserve.reservations.find(reserve => reserve?.id === id);
export const reservationsHistory = state => state.reserve.completedReservations;
export const historyById = (state,id) => state.reserve.completedReservations.find(complete => complete.id === id);


