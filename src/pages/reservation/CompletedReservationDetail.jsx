import { Table, Typography,message } from 'antd';
import styles from '../pages.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { formatAsUSD } from '../../currency';
import { toLocalDate } from './TolocalDate';
import {TableTitle} from '../../components/typo-title'
import {MaterialOutlined} from '../../components/material-icon/MaterialOutlined';
import { useSelector } from 'react-redux';
import { historyById } from '../../features/reservation/reserveSlice';

const CompletedReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // for dummy test
  const reservation = useSelector(state => historyById(state,parseInt(id))); 
  // end dummy test

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
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render : (status) => <p style={{color: "#D4B106"}}>{status}</p>
  },
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
      <Table columns={columns} dataSource={reservedRooms} rowKey={(record) => record?.id} className={styles.table} />
      <div className={styles["guest-info"]}>
          <Typography.Title level={4} className={styles["guest-info-title"]}>Guest Request</Typography.Title>
          <Typography.Paragraph>{reservation.specialRequest}</Typography.Paragraph>
      </div>
    </>
  )
}

const Detail = ({ title, value }) => (
  <div>
    <p>{title}</p>
    <p>{value}</p>
  </div>
);

export default CompletedReservationDetail