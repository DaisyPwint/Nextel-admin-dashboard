import { useState } from 'react';
import { Table, Typography, Space, Button, Modal, message } from 'antd';
import styles from './reservation.module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCompletedReservationsByIdQuery } from '../../features/reservation/reserveApiSlice';
import { useCancelReservedRoomMutation, useCheckInReservedRoomMutation } from '../../features/room/roomApiSlice';
import CustomButton from '../../components/button/CustomButton';

const CompletedReservationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reservedId,setReservedId] = useState(null);
    const [openCheckInModal, setOpenCheckInModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const {data:reservation,isLoading,error} =  useGetCompletedReservationsByIdQuery(id);
    const [checkInReservedRoom] = useCheckInReservedRoomMutation();
    const [cancelReservedRoom] = useCancelReservedRoomMutation();

    console.log(reservation);

    // const handleCheckIn = (id) => {
    //   const {data,error} = useCheckInReservedRoomMutation(id);
    //   if(data?.success){
    //     message.success(data?.message);
    //   }else{
    //     message.error(error?.data.message || error?.error)
    //   }
    // }

    const handleCheckIn = (id) => {
      setReservedId(id);
      setOpenCheckInModal(true);
    }
    
    const cancelCheckInModal = () => {
      setOpenCheckInModal(false);
      setReservedId(null);
    }

    const handleCheckInModal = async () => {
      if(reservedId){
        const {data,error} = await checkInReservedRoom(reservedId);
        console.log(data);
      if(data?.success){
        message.success(data?.message);
      }else{
        message.error(error?.data?.message || error?.error)
      }
      cancelCheckInModal()
      }
    }

    const handleCancel = (id) => {
      setReservedId(id);
      setOpenCancelModal(true);
    }

    const cancelCancelModal = () => {
      setOpenCancelModal(false);
      setReservedId(null);
    }

    const handleCancelModal = async () => {
      if(reservedId){
        const {data,error} = await cancelReservedRoom(reservedId);
        console.log(data);
      if(data?.success){
        message.success(data?.message);
      }else{
        message.error(error?.data?.message || error?.error)
      }
      cancelCancelModal()
      }
    }

    if(isLoading){
        return <p>loading...</p>
      }
    
    if (error) {
        if (error?.status === 404) {
            return <p>{error.data?.message || 'Not found'}</p>;
        } else {
            return <p>Error: {error.message}</p>;
        }
    }
    
    // const reservation = {
    //     "id": 7,
    //     "reservationId": "00007",
    //     "guestName": "Miami",
    //     "guestEmail": "miami@example.com",
    //     "guestPhone": "+959123456789",
    //     "guestAddress": "123, ABC Street, Mandalay, Myanmar",
    //     "numberOfGuest": 4,
    //     "totalRoom": 2,
    //     "checkIn": "2023-11-18T07:30:00Z",
    //     "checkOut": "2023-11-19T05:30:00Z",
    //     "createdAt": "2023-11-15T03:26:33Z",
    //     "lengthOfStay": 1,
    //     "totalCost": 1500,
    //     "status": "PENDING",
    //     "reservedRooms": [
    //         {
    //             "id": 9,
    //             "roomNumber": 101,
    //             "roomType": "Deluxe Single",
    //             "reservationId": 7,
    //             "checkIn": "2023-11-18T07:30:00Z",
    //             "checkOut": "2023-11-19T05:30:00Z",
    //             "pricePerNight": 100,
    //             "status": "PENDING"
    //         },
    //         {
    //             "id": 10,
    //             "roomNumber": 102,
    //             "roomType": "Deluxe Single",
    //             "reservationId": 7,
    //             "checkIn": "2023-11-18T07:30:00Z",
    //             "checkOut": "2023-11-19T05:30:00Z",
    //             "pricePerNight": 100,
    //             "status": "PENDING"
    //         },
    //         {
    //             "id": 11,
    //             "roomNumber": 201,
    //             "roomType": "Deluxe Double",
    //             "reservationId": 7,
    //             "checkIn": "2023-11-18T07:30:00Z",
    //             "checkOut": "2023-11-19T05:30:00Z",
    //             "pricePerNight": 200,
    //             "status": "PENDING"
    //         }
    //     ],
    //     "selectedRooms": null,
    //     "specialRequest": "Need rooms with a city view."
    // }
    
//   const options =[
//     {
//         key: '1',
//         label: 'check-in'
//     },
//     {
//         key: '2',
//         label: 'check-out'
//     },
//     {
//         key: '3',
//         label: 'canceled'
//     }
//   ]

  
  const columns = [
    {
        title: 'Room No.',
        dataIndex: 'roomNumber',
        align: 'center'
    },
    {
        title: 'Room Type',
        dataIndex: 'roomType',
        align: 'center'
    },
    {
        title: 'Check-In',
        dataIndex: 'checkIn',
        align: 'center'
    },
    {
        title: 'Check-Out',
        dataIndex: 'checkOut',
        align: 'center'
    },
    // {
    //     title: 'Price per Night',
    //     dataIndex: 'pricePerNight',
    //     align: 'center'
    // },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'center'
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     align: 'center',
    //     render: (_,record) => {
    //         return (
    //           <Space size="middle" style={{ whiteSpace: 'nowrap' }}>
    //               <Button disabled={record.status === 'Pending' || record.status === 'Canceled' } onClick={() => handleCheckIn(record.id)} >Check-in</Button>
    //               <Button disabled={record.status === 'Pending' || record.status === 'Canceled'} type='primary' danger onClick={() => handleCancel(record.id)}>Cancel</Button> 
    //           </Space>
    //         )s
    //       }
    // }
  ]

//   const data = [
//     {
//         key: 1,
//         no: 101,
//         type: 'Single Room',
//         checkIn: '01/10/2023',
//         checkOut: '04/10/2023',
//         price: 'USD 120'
//     },
//     {
//         key: 2,
//         no: 103,
//         type: 'Double Room',
//         checkIn: '02/10/2023',
//         checkOut: '05/10/2023',
//         price: 'USD 200'
//     }
//   ]

const reservedRooms = reservation?.occupiedRooms.map(room => {
    return {
        id: room.id,
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        checkIn: new Date(room.checkIn).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'}),
        checkOut: new Date(room.checkOut).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'}),
        pricePerNight: room.pricePerNight,
        status: room.status.charAt(0) + room.status.slice(1).toLowerCase()
    }
})

  return (
    <>
      <div className={styles['add-header']}>
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <Typography.Title level={3}>Reservation Detail</Typography.Title>
      </div>
      <div className={styles["infos-container"]}>
          <div className={styles.infos}>
              <div className={styles['info-datas']}>
                  <Typography.Text>Reservation ID</Typography.Text>
                  <Typography.Text>Name</Typography.Text>                    
                  <Typography.Text>Phone No</Typography.Text>            
                  <Typography.Text>Email</Typography.Text>                    
                  <Typography.Text>Address</Typography.Text>                 
                  <Typography.Text>Number of guests</Typography.Text>               
              </div>
              <div className={styles['info-datas']}>
                  <Typography.Text>: {reservation.reservationId}</Typography.Text>
                  <Typography.Text>: {reservation.guestName}</Typography.Text>
                  <Typography.Text>: {reservation.guestPhone}</Typography.Text>
                  <Typography.Text>: {reservation.guestEmail}</Typography.Text>
                  <Typography.Text>: {reservation.guestAddress}</Typography.Text>
                  <Typography.Text>: {reservation.numberOfGuest}</Typography.Text>
              </div>
          </div>
          <div className={styles.infos}>
              <div className={styles['info-datas']}>
                  <Typography.Text>Check-in Date</Typography.Text>
                  <Typography.Text>Check-out Date</Typography.Text>                    
                  <Typography.Text>Total length of stay</Typography.Text>            
                  <Typography.Text>Total Room</Typography.Text>                    
                  <Typography.Text>Total Cost</Typography.Text>            
              </div>
              <div className={styles['info-datas']}>
                  <Typography.Text>: {new Date(reservation.checkIn).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'})}</Typography.Text>
                  <Typography.Text>: {new Date(reservation.checkOut).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'})}</Typography.Text>
                  <Typography.Text>: {reservation.lengthOfStay}</Typography.Text>
                  <Typography.Text>: {reservation.totalRoom}</Typography.Text>
                  <Typography.Text>: USD {reservation.totalCost}</Typography.Text>
              </div>
          </div>
      </div>
      <Table columns={columns} dataSource={reservedRooms} />
      <div className={styles["guest-info"]}>
          <Typography.Title level={4} className={styles["guest-info-title"]}>Guest Request</Typography.Title>
          <Typography.Paragraph>{reservation.specialRequest}</Typography.Paragraph>
      </div>
      {
        openCheckInModal && (
          <Modal centered open={openCheckInModal} onCancel={cancelCheckInModal} footer={null} width={300} closeIcon={false}>
            <div className={styles['checkIn-container']}>
              <h2>Check In!</h2>
              <p>Are you sure you want to check-in this room?</p>
              <div className={styles["button-container"]}>
                  <CustomButton className={styles["no-button"]} onClick={cancelCheckInModal}>No</CustomButton>
                  <CustomButton className={styles["yes-button"]} onClick={handleCheckInModal}>Yes</CustomButton>
              </div>
            </div>
        </Modal>
        )
      }
      {
        openCancelModal && (
          <Modal centered open={openCancelModal} onCancel={cancelCancelModal} footer={null} width={300} closeIcon={false}>
            <div className={styles['checkIn-container']}>
              <h2>Cancel!</h2>
              <p>Are you sure you want to cancel this room?</p>
              <div className={styles["button-container"]}>
                  <CustomButton className={styles["no-button"]} onClick={cancelCancelModal}>No</CustomButton>
                  <CustomButton className={styles["yes-button"]} onClick={handleCancelModal}>Yes</CustomButton>
              </div>
            </div>
        </Modal>
        )
      }
    </>
  )
}

export default CompletedReservationDetail
