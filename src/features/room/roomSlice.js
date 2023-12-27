import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomRequests : [
      {
          id: 1,
          number: 101,
          type: "Deluxe Single",
          floor: 1,
          status: "AVAILABLE",
          isMaintained: false
      },
      {
          id: 2,
          number: 102,
          type: "Deluxe Single",
          floor: 1,
          status: "AVAILABLE",
          isMaintained: false
      },
      {
        id: 3,
        number: 103,
        type: "Deluxe Twin",
        floor: 1,
        status: "OCCUPIED",
        isMaintained: false
    }
  ] ,
  availableRooms : [
    {
        "id": 1,
        "number": 101,
        "type": "Deluxe Single",
        "floor": 1,
        "status": "AVAILABLE",
        "isMaintained": false
    },
    {
        "id": 4,
        "number": 202,
        "type": "Deluxe Double",
        "floor": 2,
        "status": "AVAILABLE",
        "isMaintained": false
    }
]
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addRoom : (state,{payload}) => {
            return {
                ...state,
                roomRequests: [...state.roomRequests,...payload]
            }
        },
        editRoom: (state,{payload}) => {
            return {
                ...state,
                roomRequests: state.roomRequests.map(room => (room.id === payload.id ? {...room,...payload} : room ))
            }
        },
        changeMaintain: (state,{payload}) => {
            const {id} = payload;
            return {
                ...state,
                roomRequests: state.roomRequests.map(room => (room.id === id ? {...room,...payload} : room))
            }
        },
        changeRoom : (state,{payload}) => {
            return {
                ...state,
                availableRooms: state.availableRooms.map(room => (room.id === payload ? {...room,status: 'OCCUPIED'} : room))
            }
        }
    }
})

export const {addRoom,editRoom,changeMaintain,changeRoom} = roomSlice.actions;
export default roomSlice.reducer;

export const selectAllRooms = (state) =>  state.room.roomRequests;
export const availableRooms = (state) => state.room.availableRooms;