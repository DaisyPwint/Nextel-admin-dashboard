import { Table, Input, Typography, Button} from 'antd';
import { useEffect, useState } from 'react';
import styles from '../room.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { selectAllTypes, setReservation } from '../../features/room-type/typeSlice';
import { useGetRoomTypeQuery } from '../../features/room-type/typeApiSlice';

const RoomType = () => {
  const [searchText,setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const types =useSelector(selectAllTypes);
  const {data:types,isLoading,error} = useGetRoomTypeQuery();
  // console.log(types);

//   const types = [
//     {
//         "id": 1,
//         "name": "Deluxe Single",
//         "maximumCapacity": 1,
//         "size": "50",
//         "pricePerNight": 100,
//         "description": "Our Deluxe Single Room offers a plush single bed with high-quality linens for a restful sleep. It includes a work desk, complimentary Wi-Fi, and an en-suite bathroom with premium toiletries. Additional amenities include a flat-screen TV, mini-bar, in-room safe, and 24-hour room service. Experience comfort and convenience in the heart of the city.",
//         "totalRoom": 8,
//         "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "amenities": [
//             {
//                 "id": 1,
//                 "name": "Comfortable Beds",
//                 "icon": "Comfortable Beds"
//             },
//             {
//                 "id": 6,
//                 "name": "Air Conditioning/Heating",
//                 "icon": "Air Conditioning/Heating"
//             },
//             {
//                 "id": 10,
//                 "name": "Room Service",
//                 "icon": "Room Service"
//             },
//             {
//                 "id": 20,
//                 "name": "Laundry Facilities",
//                 "icon": "Laundry Facilities"
//             },
//             {
//                 "id": 21,
//                 "name": "Ironing Facilities",
//                 "icon": "Ironing Facilities"
//             },
//             {
//                 "id": 28,
//                 "name": "In-Room Jacuzzi",
//                 "icon": "In-Room Jacuzzi"
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "name": "Deluxe Double",
//         "maximumCapacity": 2,
//         "size": "80",
//         "pricePerNight": 200,
//         "description": "The Deluxe Single Room, with its king-sized bed and high-quality linens, ensures a restful sleep. It includes a modern bathroom, a seating area, and a flat-screen TV. Complimentary Wi-Fi, a stocked mini-bar, and a safe are also provided. Large windows offer city views. Guests have access to 24-hour room service. This room is a blend of comfort and luxury, perfect for both business and leisure stays.",
//         "totalRoom": 20,
//         "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "amenities": [
//             {
//                 "id": 1,
//                 "name": "Comfortable Beds",
//                 "icon": "Comfortable Beds"
//             },
//             {
//                 "id": 6,
//                 "name": "Air Conditioning/Heating",
//                 "icon": "Air Conditioning/Heating"
//             },
//             {
//                 "id": 10,
//                 "name": "Room Service",
//                 "icon": "Room Service"
//             },
//             {
//                 "id": 28,
//                 "name": "In-Room Jacuzzi",
//                 "icon": "In-Room Jacuzzi"
//             }
//         ]
//     }
// ]

  useEffect(() => {
    dispatch(setReservation(types))
  },[dispatch,types])     

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: "center",
      render: (_,record,index) => index + 1
    },
    {
      title: 'Room Type',
      dataIndex: 'name',
      align: "center",
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) || String(record.capacity).toLowerCase().includes(value.toLowerCase()) || String(record.price).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: 'Maximum Capacity',
      dataIndex: 'maximumCapacity',
      align: "center",
    },
    {
      title: 'Price per night',
      dataIndex: 'pricePerNight',
      align: "center",
    },
    {
      title: 'Room Size',
      dataIndex: 'size',
      align: "center",
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Link to={`/room-type/${record?.id}`}>Edit</Link>
        )
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Link to={`/room-type/detail/${record?.id}`}>Detail</Link>
        )
    }
  ]

    if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }    
  
  return (
    <>
      <div className={styles.header}>
        <Typography.Title level={3}>Room Type Lists</Typography.Title>
        <div className={styles.action}>
          <Input.Search placeholder='Search here...' onSearch={(value) => {
            setSearchText(value);
          }} onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <Button type='primary' className='add-btn' onClick={() => navigate('/add-room-type')}><PlusOutlined/> Add Room Type</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={types}/>
    </>
  )
}

export default RoomType