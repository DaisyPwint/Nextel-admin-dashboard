import { Table, Typography, Button, message } from "antd"
import styles from '../room.module.css';
import { ArrowLeftOutlined} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckInRoomMutation, useGetAvailableRoomsByReservationIdQuery } from "../../features/room/roomApiSlice";

// const data = [
//     {
//         "id": 1,
//         "number": 101,
//         "type": "Deluxe Single",
//         "floor": 1,
//         "status": "AVAILABLE",
//         "isMaintained": false
//     },
//     {
//         "id": 4,
//         "number": 202,
//         "type": "Deluxe Double",
//         "floor": 2,
//         "status": "AVAILABLE",
//         "isMaintained": false
//     }
// ]

const ChangeRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationId = new URLSearchParams(location?.search).get("reservationId");

  const {data: availableRooms, isLoading} = useGetAvailableRoomsByReservationIdQuery(reservationId);

  const [checkInRoom] = useCheckInRoomMutation()

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
      render: (status) => <p>{status.charAt(0) + status.slice(0).toLowerCase()}</p>
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => <Button onClick={() => handleCheckIn(record.id)}>Check-in</Button>
    }
  ]

  const handleCheckIn = async(id) => {
    const {data,error} = await checkInRoom ({ id, reservationId });

    console.log(data, error)

    if(data?.success){
      message.success(data?.message);
    }else{
      message.error(error?.data.message || error?.error)
    }
  }

  if(isLoading){
    return <div> Loading . . . </div>
  }

  return (
    <>
      <div className={styles['add-header']}>      
        <ArrowLeftOutlined onClick={() => navigate(-1)} /> 
        <Typography.Title level={3} className={styles['add-title']}>Change Room</Typography.Title>
      </div>
      <Table columns={columns} dataSource={availableRooms} rowKey={(record) => record.id} />
    </>
  )
}

export default ChangeRoom