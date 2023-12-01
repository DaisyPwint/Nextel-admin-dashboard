import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker} from "antd"
import { useState } from "react";
import styles from './reservation.module.css';
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import dayjs from "dayjs";
import { useGetCompletedReservationsQuery, useGetReservationByFilterQuery } from "../../features/reservation/reserveApiSlice";

const { useToken } = theme;
const monthFormat = 'MMM-YYYY';

const transformedData = (reservationObject) => {
  return {
    id: reservationObject.id,
    reservationId: reservationObject.reservationId,
    guestName: reservationObject.guestName.charAt(0).toUpperCase() + reservationObject.guestName.slice(1),
    guestEmail: reservationObject.guestEmail,
    totalRoom: 1,
    checkIn: {
      date: new Date(reservationObject.checkIn).toLocaleString('en-GB', {  day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(reservationObject.checkIn).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    checkOut: {
      date: new Date(reservationObject.checkOut).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(reservationObject.checkOut).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    createdAt: {
      date: new Date(reservationObject.createdAt).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(reservationObject.createdAt).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    status: reservationObject.status.charAt(0) + reservationObject.status.slice(1).toLowerCase()
  }
}

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

  const [filterValues,setFilterValues] = useState({
    reservationDate : null,
    checkInDate : null,
    checkOutDate : null
  });

  const {data : completedReservations, isLoading, error} = useGetReservationByFilterQuery({
    monthFilter : month?.format('YYYY-MM'),
    status : "COMPLETED",
    ...filterValues
  })

  const dataSource = completedReservations?.map(reservation => transformedData(reservation));
  // const formatFilter = filterReservaions?.map(reservation => transformedData(reservation));

  // const dataSource = filterValues.reservationDate || filterValues.checkInDate || filterValues.checkOutDate
  // ? formatFilter
  // : formatCompleted;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

//   const reservations = [
//     {
//         "id": 7,
//         "reservationId": "00007",
//         "guestName": "Miami",
//         "guestEmail": "miami@example.com",
//         "totalRoom": 2,
//         "checkIn": "2023-11-18T07:30:00Z",
//         "checkOut": "2023-11-19T05:30:00Z",
//         "createdAt": "2023-11-15T03:26:33Z",
//         "status": "PENDING"
//     },
//     {
//         "id": 13,
//         "reservationId": "00013",
//         "guestName": "Chicago",
//         "guestEmail": "chicago@example.com",
//         "totalRoom": 2,
//         "checkIn": "2023-11-16T07:30:00Z",
//         "checkOut": "2023-11-17T05:30:00Z",
//         "createdAt": "2023-11-15T03:58:31Z",
//         "status": "CONFIRMED"
//     },
//     {
//         "id": 16,
//         "reservationId": "00016",
//         "guestName": "Tanaka",
//         "guestEmail": "tanaka@example.com",
//         "totalRoom": 2,
//         "checkIn": "2023-12-01T07:30:00Z",
//         "checkOut": "2023-12-05T05:30:00Z",
//         "createdAt": "2023-11-15T04:01:52Z",
//         "status": "PENDING"
//     }
// ]

  const contentStyle = {
    padding: "15px",
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
        <div style={{textAlign:"left"}}>
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
      const filteredValues = {
          reservationDate: reservationDate ? reservationDate.format('YYYY-MM-DD') : null,
          checkInDate: checkInDate ? checkInDate.format('YYYY-MM-DD') : null,
          checkOutDate: checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null
        }
    setFilterValues(filteredValues);
    setOnfilter(false);
  }

  const onMonthChange = (value) => {
    setMonth(value || dayjs());
  };

if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

  return (
    <>
    <Typography.Title level={3}>Reservation Lists</Typography.Title>
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
            <Space>
              <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Reservation</Typography.Title>
            </Space>
            <Divider style={{margin: "10px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                <Form.Item name="reservationDate" label="Reservation Date">
                  <DatePicker format="DD/MM/YYYY"/>
                </Form.Item>
                <Form.Item name="checkInDate" label="Check-in date">
                  <DatePicker placeholder="Select check-in" format="DD/MM/YYYY"/>
                </Form.Item>
                <Form.Item name="checkOutDate" label="Check-out date">
                  <DatePicker placeholder="Select check-out" format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item style={{textAlign: "right"}}>
                  <Space>
                    <Button htmlType="reset">Reset</Button>
                    <Button type="primary" className={`add-btn`} htmlType="submit">
                      Filter
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </div>
        )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <FilterOutlined style={{fontSize: "20px"}}/>
          </a>
        </Dropdown>
      </div>
    </div>
    <Table columns={columns} rowKey={(record) => record?.id} loading={isLoading} bordered dataSource={dataSource} />  
    </>
  )
}

export default ReservationHistory


