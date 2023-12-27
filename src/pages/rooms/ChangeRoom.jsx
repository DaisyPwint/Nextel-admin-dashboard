import { useState } from 'react';
import { Table, Button, message, Modal } from "antd"
import styles from '../reservation/../pages.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { availableRooms, changeRoom } from "../../features/room/roomSlice";
import ModalContent from '../reservation/ModalContent';
import { TableTitle } from '../../components/typo-title'
import {MaterialOutlined} from '../../components/material-icon/MaterialOutlined';
// import { useCheckInRoomMutation, useGetAvailableRoomsByReservationIdQuery } from "../../features/room/roomApiSlice";

const ChangeRoom = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const reservationId = new URLSearchParams(location?.search).get("reservationId");
  // const {data: availableRooms, isLoading} = useGetAvailableRoomsByReservationIdQuery(reservationId);
  // const [checkInRoom] = useCheckInRoomMutation()
  const [openCheckInModal, setOpenCheckInModal] = useState(false);
  const [currentRoomId,setCurrentRoomId] = useState(null);

  //for dummy test
  const rooms = useSelector(availableRooms);  
  const dispatch = useDispatch();
  //end dummy test

  const dataSource = rooms?.map(value => ({
    ...value,
    status: value.status.charAt(0) + value.status.slice(1).toLowerCase()
  })); 

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: "center",
      render: (_,record,index) => index + 1
    },
    {
      title: 'Room No',
      dataIndex: 'number',
      align: "center",
    },
    {
      title: 'Room Type',
      dataIndex: 'type',
      align: "center",
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      align: "center",
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: "center",
      render: (status) =>  {
        let color = '';
        switch (status) {
          case 'Available':
            color = '#52C41A'
            break;
          case 'Occupied':
            color = '#1890FF'
            break;
          default:
            break;
        }
        return <p style={{color}}>{status}</p>
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => <Button onClick={() => handleCheckIn(record.id)} disabled={record.status === 'Occupied'}  style={record.status === 'Occupied' ? {} : {backgroundColor: "#389E0D",color:"#fff",border:"none"}}>Check-in</Button>
    }
  ]

  const handleCheckIn = (id) => {
    setCurrentRoomId(id);
    setOpenCheckInModal(true);
  }

  const cancelCheckInModal = () => {
    setOpenCheckInModal(false);
    setCurrentRoomId(null);
  }

  //for dummy test
  const handleCheckInModal = () => {
    dispatch(changeRoom(currentRoomId))
    setOpenCheckInModal(false);
  }
  //end dummy test

  // const handleCheckIn = async(id) => {
  //   const {data,error} = await checkInRoom ({ id, reservationId });

  //   console.log(data, error)

  //   if(data?.success){
  //     message.success(data?.message);
  //   }else{
  //     message.error(error?.data.message || error?.error)
  //   }
  // }

  // if(isLoading){
  //   return <div> Loading . . . </div>
  // }

  return (
    <>
      <div className={styles['add-header']}>      
        <MaterialOutlined style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>arrow_back</MaterialOutlined>
        <TableTitle>Change Room</TableTitle>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
      <Modal centered open={openCheckInModal} onCancel={cancelCheckInModal} footer={null} width={300} closeIcon={false}>
        <ModalContent title="Check In!" content="Are you sure you want to check-in this room?" onCancel={cancelCheckInModal} onConfirm={handleCheckInModal} 
        className={styles["confirm-yes-button"]}/>
      </Modal>
    </>
  )
}

export default ChangeRoom