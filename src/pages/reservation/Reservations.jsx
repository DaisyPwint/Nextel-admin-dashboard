import { Input, Table, Typography, Space, Button, Dropdown, Divider, Form, DatePicker, Select, message,Modal } from "antd"
import { useEffect, useState, useMemo } from "react";
import styles from '../pages.module.css';
import { ReloadOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import dayjs from "dayjs";

// import { useCheckExpReservationsMutation, useGetReservationByFilterQuery, useUpdateStatusMutation } from "../../features/reservation/reserveApiSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalContent from "./ModalContent";
import ReservationFilter from "./ReservationFilter";
import {TableTitle} from "../../components/typo-title";
import { transformedData } from "./reserveTransformData";
import {MaterialOutlined} from "../../components/material-icon/MaterialOutlined";
import { cancelReservation, confirm, reservations } from "../../features/reservation/reserveSlice";

const monthFormat = 'MMM-YYYY';

const Reservations = () => {
  const [searchText,setSearchText] = useState("");
  const [form] = Form.useForm();
  const [ month,setMonth ] = useState(dayjs());
  const [onFilter,setOnfilter] = useState(false);
  const [filterValues,setFilterValues] = useState({
    status : "pending",
    reservationDate : null,
    checkInDate : null,
    checkOutDate : null
  });
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);  

  // for dummy test 
  
  const [filterData,setFilterData] = useState(null);
  const [reserveId,setReserveId] = useState(null);
  const allReservations = useSelector(reservations);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (filterValues.status === 'pending') {
      const pendingReservations = allReservations.filter(reservation => reservation.status.toLowerCase() === filterValues.status);
      setFilterData(pendingReservations);
    }
    if (filterValues.status === 'expired') {
      const expireReservations = allReservations.filter(reservation => reservation.status.toLowerCase() === 'expired');
      setFilterData(expireReservations);
    }
  }, [filterValues.status, allReservations]);
  
  //end dummy test

  const data = filterValues !== 'pending' && filterData;
  const dataSource = data?.map(item => transformedData(item));

  const onFinish = (fieldsValue) => {
    const {status,reservationDate,checkInDate,checkOutDate} = fieldsValue;

    const reserveStatus = status.toLowerCase();
    const reserveDate = reservationDate ? reservationDate.format('YYYY-MM-DD') : null;
    const checkIn = checkInDate ?  checkInDate.format('YYYY-MM-DD') : null;
    const checkOut = checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null;

    const filteredValues = {
        status : reserveStatus,
        reservationDate : reserveDate,
        checkInDate : checkIn,
        checkOutDate : checkOut
      }
    // for dummy filter 
    const filteredData = allReservations.filter(reserve => {
      const statusFilter = !reserveStatus || reserve.status.toLowerCase().includes(reserveStatus);
      const reserveFilter = !reserveDate || reserve.createdAt.includes(reserveDate);
      const checkInFilter = !checkIn || reserve.checkIn.includes(checkIn);
      const checkOutFilter = !checkOut || reserve.checkOut.includes(checkOut);

      return statusFilter && reserveFilter && checkInFilter && checkOutFilter;
    })
    // end dummy filter
    setFilterValues(filteredValues);
    setFilterData(filteredData);
    setOnfilter(false);
  }

  //reservation confirm modal
  const confirmationModal = (id) => {
    setReserveId(id);
    setOpenConfirmModal(true);
  };

  // for dummy test
  const handleReservationConfirm = () => {
    dispatch(confirm({reserveId,status: "CONFIRMED"}));
    closeConfirmModal();
};
// end dummy test

  const closeConfirmModal = () => {
    setOpenConfirmModal(false);
  }

  // reservation cancel modal
  const cancellationModal = (id) => {
    setReserveId(id);
    setOpenCancelModal(true);
  }

    // for dummy test
  const handleReservationCancel = () => {
    dispatch(cancelReservation({reserveId,status: "CANCELED"}));
    closeCancelModal();
  }
  // end dummy test

  const closeCancelModal = () => {
    setOpenCancelModal(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'reservationId',
      filteredValue: [searchText],
      sorter: (a,b) => b.reservationId - a.reservationId,
      onFilter: (value,record) => {
        return (
          String(record.reservationId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestEmail).toLowerCase().includes(value.toLowerCase()) ||
          String(record.totalRoom).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Name',
      dataIndex: 'guestInfo',
      align: "center",      
      render: (_,record) => (
        <div style={{textAlign:"center"}}>
          <span>{record.guestName}</span> <br />
          <span style={{color: "#096DD9"}}>{record.guestEmail}</span>
        </div>
        )
    },
    {
      title: 'Check-in',
      dataIndex: 'checkIn',
      align: "center",   
      render: (_,record) => (
          <Space direction="vertical">
            <div>{record.checkIn.date}</div>
            <div>{record.checkIn.time}</div>
          </Space>
        )
    },
    {
      title: 'Check-out',
      dataIndex: 'checkOut',
      align: "center",  
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.checkOut.date}</div>
          <div>{record.checkOut.time}</div>
        </Space>
      )    
    },
    {
      title: 'Total Room',
      dataIndex: 'totalRoom',
      align: "center",      
    },
    {
      title: 'Reservation Date',
      dataIndex: 'createdAt',
      align: "center",  
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.createdAt.date}</div>
          <div>{record.createdAt.time}</div>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: "center",
      render: (_,record) => {
        let color = '';
        switch (record.status) {
          case 'Pending':
            color = '#1890FF'
            break;
          case 'Confirmed':
            color = '#389E0D'
            break;
          case 'Canceled':
            color = '#F5222D'
            break;
          case 'Expired':
            color = '#FF8000';
            break;
          default:
            break;
        }
        return <p style={{color}}>{record.status}</p>
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Space size="middle" style={{ whiteSpace: 'nowrap' }}>
            <Button onClick={() => confirmationModal(record?.id)} disabled={record.status === 'Confirmed' || record.status === 'Canceled'} style={ record.status === 'Confirmed' || record.status === 'Canceled' ? {} : {backgroundColor: "#389E0D",color:"#fff",border:"none"}}>Confirm</Button>
            <Button onClick={() => cancellationModal(record?.id)} disabled={record.status === 'Canceled' || record.status === 'Confirmed'} type="primary" danger>Cancel</Button> 
          </Space>
        )
    },
    {
      title: 'Detail',
      dataIndex: 'detail', 
      align: "center",
      render: (_,record) => (
        <Link to={`/reservations/${record.id}`} style={{textDecoration: 'underline'}}>Detail</Link>
        )
    }
  ]

  const onMonthChange = (value) => {
    setMonth(value || dayjs());
  };

  return (
    <>
    <TableTitle>Reservation Lists</TableTitle>
    <div className={styles.header}>
      <DatePicker onChange={onMonthChange} allowClear={false} inputReadOnly={true} defaultValue={month} format={monthFormat} picker="month" style={{width: 200}}/>
      <div className={styles.action}>
        <Input.Search placeholder="Search id,name and total room" onSearch={(value) => {
          setSearchText(value);
        }} onChange={(e) => {
          setSearchText(e.target.value)
        }} style={{width: 250}}></Input.Search>
        <Button type="primary" icon={<ReloadOutlined />}>Check Expired</Button>
        <ReservationFilter onFilter={onFilter} setOnfilter={setOnfilter} form={form} onFinish={onFinish} filterValues={filterValues} />
      </div>
    </div>
    <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} className={styles.table} />  
      <Modal centered open={openConfirmModal} onCancel={closeConfirmModal} footer={null} width={300} closeIcon={false}>        
        <ModalContent title="Confirm Reservation"
          content="Are you sure you want to confirm this reservation?"
          onCancel={closeConfirmModal}
          onConfirm={handleReservationConfirm} 
          className={styles["confirm-yes-button"]}
        />
        <div className={styles["check-circle"]}>
          <MaterialOutlined style={{fontSize:'30px'}}>check</MaterialOutlined>
        </div>
      </Modal>
      <Modal centered open={openCancelModal} onCancel={closeCancelModal} footer={null} width={300} closeIcon={false}>
        <ModalContent title="Cancel Reservation"
        content="Are you sure you want to cancel this reservation?"
        onCancel={closeCancelModal}
        onConfirm={handleReservationCancel} 
        className={styles["cancel-yes-button"]}
        />
        <div className={styles["cross-circle"]}>
          <MaterialOutlined style={{fontSize:'30px'}}>close</MaterialOutlined>
        </div>
      </Modal>
    </>
  )
}

export default Reservations
