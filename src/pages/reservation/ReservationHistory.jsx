import { Input, Table, Space, Button, Dropdown, theme, Divider, Form, DatePicker} from "antd"
import { useState } from "react";
import styles from '../pages.module.css';
import { Link} from "react-router-dom";
import dayjs from "dayjs";
// import { useGetCompletedReservationsQuery, useGetReservationByFilterQuery } from "../../features/reservation/reserveApiSlice";
import {TableTitle,FilterTitle} from "../../components/typo-title";
import { transformedData } from "./reserveTransformData";
import {MaterialOutlined} from "../../components/material-icon/MaterialOutlined";
import { useSelector } from "react-redux";
import { reservationsHistory } from "../../features/reservation/reserveSlice";

const { useToken } = theme;
const monthFormat = 'MMM-YYYY';

const ReservationHistory = () => {
  const [searchText,setSearchText] = useState("");
  const { token } = useToken();
  const [onFilter,setOnfilter] = useState(false);
  const [ month,setMonth ] = useState(dayjs());
  // const {data:completedReservations,isLoading,error} = useGetCompletedReservationsQuery();

  // const {data:filterReservaions} = useGetReservationByFilterQuery({
  //   monthFilter : month?.format('YYYY-MM'),
  //   ...filterValues
  // })

  // const [filterValues,setFilterValues] = useState({
  //   reservationDate : null,
  //   checkInDate : null,
  //   checkOutDate : null
  // });

  // const {data : completedReservations, isLoading, error} = useGetReservationByFilterQuery({
  //   monthFilter : month?.format('YYYY-MM'),
  //   status : "COMPLETED",
  //   ...filterValues
  // })

  // for dummy test 
  const [filterValues,setFilterValues] = useState(null);
  const completedReservations = useSelector(reservationsHistory);
  const data = filterValues ? filterValues : completedReservations;
  const dataSource = data?.map(reservation => transformedData(reservation));  
  // end dummy test

  // const formatFilter = filterReservaions?.map(reservation => transformedData(reservation));

  // const dataSource = filterValues.reservationDate || filterValues.checkInDate || filterValues.checkOutDate
  // ? formatFilter
  // : formatCompleted;

  const contentStyle = {
    padding: "5px 25px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
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
      render: (_,record) => <p style={{color: '#389E0D'}}>{record.status}</p>        
    },
    {
      title: 'Detail',
      dataIndex: 'detail', 
      align: "center",
      render: (_,record) => (
        <Link to={`/reservations-history/${record.id}`} style={{textDecoration: 'underline'}}>Detail</Link>
        )
    }
  ]

  const onFinish = (fieldsValue) => {
    const {reservationDate,checkInDate,checkOutDate} = fieldsValue;
      // const filteredValues = {
      //     reservationDate: reservationDate ? reservationDate.format('YYYY-MM-DD') : null,
      //     checkInDate: checkInDate ? checkInDate.format('YYYY-MM-DD') : null,
      //     checkOutDate: checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null
      //   }
    const reserveDate = reservationDate ? reservationDate.format('YYYY-MM-DD') : null;
    const checkIn = checkInDate ?  checkInDate.format('YYYY-MM-DD') : null;
    const checkOut = checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null;
    // for dummy filter 
    const filteredData = completedReservations.filter(reserve => {
      const reserveFilter = !reserveDate || reserve.createdAt.includes(reserveDate);
      const checkInFilter = !checkIn || reserve.checkIn.includes(checkIn);
      const checkOutFilter = !checkOut || reserve.checkOut.includes(checkOut);

      return reserveFilter && checkInFilter && checkOutFilter;
    })
    setFilterValues(filteredData);
    // end dummy filter
    // setFilterValues(filteredValues);
    setOnfilter(false);
  }

  const onMonthChange = (value) => {
    setMonth(value || dayjs());
  };


  return (
    <>
    <TableTitle>Reservation History</TableTitle>
    <div className={styles.header}>
      <DatePicker onChange={onMonthChange} allowClear={false} inputReadOnly={true} defaultValue={dayjs()} format={monthFormat} picker="month" style={{width: 200}}/>
      <div className={styles.action}>
        <Input.Search placeholder="Search id,name and total room" onSearch={(value) => {
          setSearchText(value);
        }} onChange={(e) => {
          setSearchText(e.target.value)
        }} style={{width: 250}}></Input.Search>
        <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <FilterTitle>Filter History</FilterTitle>
            <Divider style={{margin: "6px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                <Form.Item name="reservationDate" label="Reservation Date" style={{marginBottom: "10px"}}>
                  <DatePicker format="DD/MM/YYYY"  style={{width: 180}}/>
                </Form.Item>
                <Form.Item name="checkInDate" label="Check-in date" style={{marginBottom: "10px"}}>
                  <DatePicker placeholder="Select check-in" format="DD/MM/YYYY" style={{width: 180}}/>
                </Form.Item>
                <Form.Item name="checkOutDate" label="Check-out date" style={{marginBottom: "10px"}}>
                  <DatePicker placeholder="Select check-out" format="DD/MM/YYYY"  style={{width: 180}} />
                </Form.Item>
                <Form.Item style={{textAlign: "right"}}>
                  <Space>
                    <Button htmlType="reset">Reset</Button>
                    <Button type="primary" htmlType="submit">
                      Filter
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </div>
        )}
        >
          <a onClick={(e) => e.preventDefault()} className={styles['filter-button']}>
            <MaterialOutlined style={{color: "#181818"}}>filter_list</MaterialOutlined>
          </a>
        </Dropdown>
      </div>
    </div>
    {/* <Table columns={columns} rowKey={(record) => record?.id} loading={isLoading} bordered dataSource={dataSource} />   */}
    <Table columns={columns} rowKey={(record) => record?.id} dataSource={dataSource} className={styles.table} />  
    </>
  )
}

export default ReservationHistory


