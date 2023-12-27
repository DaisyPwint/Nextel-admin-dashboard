import { useState } from 'react';
import { Table, Typography, Space, Button, Modal, message } from 'antd';
import styles from '../pages.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { formatAsUSD } from '../../currency';
import { toLocalDate } from './TolocalDate';
import ModalContent from './ModalContent';
import {TableTitle} from '../../components/typo-title'
import {MaterialOutlined} from '../../components/material-icon/MaterialOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRoom, checkIn, reservationById } from '../../features/reservation/reserveSlice';

const DetailReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openCheckInModal, setOpenCheckInModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [checkedInRooms, setCheckedInRooms] = useState([]);
    const [cancelledRooms, setCancelledRooms] = useState([]);
    const [currentRoomToOperate, setCurrentRoomToOperate] = useState(null);

    // for dummy test
    const [reserveId,setReserveId] = useState(null);
    const reservation = useSelector(state => reservationById(state,parseInt(id)));
    const dispatch = useDispatch();
    // end dummy test

    const reservedRooms = reservation?.reservedRooms.map(room => {
      return {
          id: room.id,
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          checkIn: toLocalDate(room.checkIn),
          checkOut: toLocalDate(room.checkOut),
          pricePerNight: formatAsUSD(room.pricePerNight),
          status: room.status.charAt(0) + room.status.slice(1).toLowerCase()
      }
  })

    const handleCheckIn = (id) => {
      setReserveId(id);      
      setOpenCheckInModal(true);
    }
    
    const cancelCheckInModal = () => {
      setOpenCheckInModal(false);
    }

    //for dummy test
    const handleCheckInModal = () => {
      if(currentRoomToOperate){
        setCheckedInRooms([...checkedInRooms,currentRoomToOperate]);
        setCurrentRoomToOperate(null);
        dispatch(checkIn({reserveId,status: 'CHECKED_IN'}));
      }
      cancelCheckInModal();
    }
    //end dummy test

    const handleCancel = (id) => {
      setReserveId(id); 
      setOpenCancelModal(true);
    }

    const cancelCancelModal = () => {
      setOpenCancelModal(false);
    }

    //for dummy test
    const handleCancelModal = () => {
      if(currentRoomToOperate){
        setCancelledRooms([...cancelledRooms,currentRoomToOperate]);
        setCurrentRoomToOperate(null);
        dispatch(cancelRoom({reserveId,status: 'CANCELED'}));
      }
      cancelCancelModal()
    }
    //end dummy test

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
    {
        title: 'Price per Night',
        dataIndex: 'pricePerNight',
        align: 'center'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        render: (status) => {
          let color = '';
          switch (status) {
            case 'Pending':
              color = '#1890FF'
              break;
            case 'Confirmed':
              color = '#389E0D'
              break;
            case 'Canceled':
              color = '#F5222D'
              break;
            case 'Checked_in': 
              color = '#D4B106'
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
        align: 'center',
        render: (_,record) => {
            return (
              <Space size="middle" style={{ whiteSpace: 'nowrap' }}>
                  <Button disabled={record.status === 'Pending' || record.status === 'Canceled' || record.status === 'Checked_in' || checkedInRooms.includes(record.id)} style={ record.status === 'Pending' || record.status === 'Canceled'|| record.status === 'Checked_in' || checkedInRooms.includes(record.id) ? {} : {backgroundColor: "#389E0D",color:"#fff",border:"none"}} onClick={() => {
                setCurrentRoomToOperate(record.id);
                handleCheckIn(record.id);
              }} >Check-in</Button>
                  <Button disabled={record.status === 'Pending' || record.status === 'Canceled' || record.status === 'Checked_in' || cancelledRooms.includes(record.id)} type='primary' danger 
                  onClick={() => {
                    setCurrentRoomToOperate(record.id);
                    handleCancel(record.id);
                  }}
              >Cancel</Button> 
              </Space>
            )
          }
    }
  ]

  return (
    <>
      <div className={styles['add-header']}>
        <MaterialOutlined style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>arrow_back</MaterialOutlined>
        <TableTitle>Reservation Detail</TableTitle>
      </div>
      <div className={styles["infos-container"]}>
        <div className={styles["person-infos"]}>
          <div className={styles["person-icon"]}>
            <MaterialOutlined style={{fontSize: '50px'}}>person</MaterialOutlined>  
          </div>
          <p>{reservation.guestName}</p>
          <p>{reservation.guestEmail}</p>
        </div>
        <div className={styles["person-details"]}>
          <Detail title="Reservation ID" value={reservation.reservationId} />
          <Detail title="Phone No" value={reservation.guestPhone} />
          <Detail title="Address" value={reservation.guestAddress} />
          <Detail title="Check-in Date" value={toLocalDate(reservation.checkIn)} />
          <Detail title="Check-out Date" value={toLocalDate(reservation.checkOut)} />
          <Detail title="Total length of stay" value={reservation.lengthOfStay} />
          <Detail title="Number of guests" value={reservation.numberOfGuest} />
          <Detail title="Total Room" value={reservation.totalRoom} />
          <Detail title="Total Cost" value={formatAsUSD(reservation.totalCost)} />
        </div>
      </div>
      <Table columns={columns} dataSource={reservedRooms} rowKey={(record) => record.id} className={styles.table} />
      <div className={styles["guest-info"]}>
          <Typography.Title level={4} className={styles["guest-info-title"]}>Guest Request</Typography.Title>
          <Typography.Paragraph>{reservation.specialRequest}</Typography.Paragraph>
      </div>
      <Modal centered open={openCheckInModal} onCancel={cancelCheckInModal} footer={null} width={300} closeIcon={false}>
        <ModalContent title="Check In!" content="Are you sure you want to check-in this room?" onCancel={cancelCheckInModal} onConfirm={handleCheckInModal} 
        className={styles["confirm-yes-button"]}/>
      </Modal>
      <Modal centered open={openCancelModal} onCancel={cancelCancelModal} footer={null} width={300} closeIcon={false}>
        <ModalContent title="Cancel Room!" content="Are you sure to cancel this room? This action can’t be undone." onCancel={cancelCancelModal} onConfirm={handleCancelModal} 
        className={styles["cancel-yes-button"]}/>
        <div className={styles["cross-circle"]}>
          <MaterialOutlined style={{fontSize:'30px'}}>close</MaterialOutlined>
        </div>
      </Modal>
    </>
  )
}

const Detail = ({ title, value }) => (
  <div>
    <p>{title}</p>
    <p>{value}</p>
  </div>
);

export default DetailReservation
