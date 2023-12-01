import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select } from "antd"
import styles from '../room.module.css';
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { useGetOccupationHistoryQuery, useGetOccupiedByFilterQuery } from "../../features/occupation/occupiedApiSlice";

const { useToken } = theme;
// const options = [
//   {
//     value: 'single',
//     label: 'Single',
//   },{
//     value: 'double',
//     label: 'Double',
//   },{
//     value: 'family',
//     label: 'Family',
//   }
// ]
// checkIn: "2023-11-15T09:12:57Z"
// ​​
// checkOut: "2023-11-16T06:46:48Z"
// ​​
// guestEmail: "jane@example.com"
// ​​
// guestName: "Jane"
// ​​
// guestPhone: "+959123456789"
// ​​
// id: 3
// ​​
// reservationId: 3
// ​​
// roomNumber: 102
// ​​
// roomType: "Deluxe Single"
// ​​
// status: "CHECKED_OUT"

const transformedData = (occupiedObject) => {
  return {
    id: occupiedObject.id,
    reservationId: occupiedObject.reservationId,
    guestName: occupiedObject.guestName.charAt(0).toUpperCase() + occupiedObject.guestName.slice(1),
    guestPhone: occupiedObject.guestPhone,
    guestEmail: occupiedObject.guestEmail,
    roomNumber: occupiedObject.roomNumber,
    roomType: occupiedObject.roomType,
    checkIn: {
      date: new Date(occupiedObject.checkIn).toLocaleString('en-GB', {  day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(occupiedObject.checkIn).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    checkOut: {
      date: new Date(occupiedObject.checkOut).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(occupiedObject.checkOut).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    status: occupiedObject.status.charAt(0) + occupiedObject.status.slice(1).toLowerCase()
  }
}

const OccupationHistory = () => {
  const { token } = useToken();
  const [searchText,setSearchText] = useState("");
  const [onFilter,setOnfilter] = useState(false);
  const [filterValues,setFilterValues] = useState({
    type: null,
    checkInDate : null,
    checkOutDate : null
  });
  const {data,isLoading,error} = useGetOccupationHistoryQuery();
  const {data:filteredRooms,isLoading:isFRoomLoading} = useGetOccupiedByFilterQuery({
    ...filterValues
  })

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  // const columns = [
  //   {
  //     title: 'No',
  //     dataIndex: 'key',
  //     filteredValue: [searchText],
  //     onFilter: (value,record) => {
  //       return (
  //         String(record.name).toLowerCase().includes(value.toLowerCase()) ||
  //         String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
  //         String(record.email).toLowerCase().includes(value.toLowerCase()) ||
  //         String(record.number).toLowerCase().includes(value.toLowerCase())
  //         )
  //     },
  //     align: 'center',
  //     render: (_,record,index) => index + 1
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'guestName',
  //     align: 'center'
  //   },
  //   {
  //     title: 'Phone',
  //     dataIndex: 'guestPhone',
  //     align: 'center'
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'guestEmail',
  //     align: 'center'
  //   },
  //   {
  //     title: 'Room No',
  //     dataIndex: 'roomNumber',
  //     align: 'center'
  //   },
  //   {
  //     title: 'Room Type',
  //     dataIndex: 'roomType',
  //     align: 'center'
  //   },
  //   {
  //     title: 'Check-in Date',
  //     dataIndex: 'checkIn',
  //     align: 'center'
  //   },
  //   {
  //     title: 'Check-out Date',
  //     dataIndex: 'checkOut',
  //     align: 'center'
  //   }
  // ]

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.number).toLowerCase().includes(value.toLowerCase())
          )
      },
      align: 'center',
      render : (_,record,index) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
      render: (_,record) => (
        <div style={{textAlign:"left"}}>
          <span>{record.guestName}</span> <br />
          <span style={{color: "#096DD9"}}>{record.guestEmail}</span>
        </div>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'guestPhone',
      align: 'center',
      render:(guestPhone) => <p style={{color: "#096DD9"}}>{guestPhone}</p>
    },
    {
      title: 'Room No',
      dataIndex: 'roomNumber',
      align: 'center'
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      align: 'center'
    },
    {
      title: 'Check-in Date',
      dataIndex: 'checkIn',
      align: 'center',
      render: (_,record) => (
        <Space direction="vertical">
          <span>{record.checkIn.date}</span>
          <span>{record.checkIn.time}</span>
        </Space>
      )
    },
    {
      title: 'Check-out Date',
      dataIndex: 'checkOut',
      align: 'center',
      render: (_,record) => (
        <Space direction="vertical">
          <span>{record.checkOut.date}</span>
          <span>{record.checkOut.time}</span>
        </Space>
      )
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   align: "center",
    //   render: (_,record) => (
    //       <Button type="primary" className={`add-btn`} danger onClick={() => confirmationModal(record?.id)}  className={styles["confirm-button"]}>Check-out</Button>
    //     )
    // },
  ]

  const filteredHistory = data?.map(info => transformedData(info));
  const formattedFilteredRooms = filteredHistory?.map(room => transformedData(room));
  const dataSource = filterValues.type || filterValues.checkInDate || filterValues.checkOutDate
? formattedFilteredRooms
: filteredHistory;

  // const data = [
  //   {
  //     id: '001',
  //     name: 'Mg Mg',
  //     phone: '+95 9788676754',
  //     email: "mgmg@gmail.com",
  //     number: 113,
  //     type: "Single",
  //     checkIn: '01/10/2023',
  //     checkOut: '05/10/2023'
  //   },
  //   {
  //     id: '002',
  //     name: 'Aung Aung',
  //     phone: '+95 9788676754',
  //     email: "aungaung@gmail.com",
  //     number: 114,
  //     type: "Double",
  //     checkIn: '01/10/2023',
  //     checkOut: '05/10/2023'
  //   },
  //   {
  //     id: '003',
  //     name: 'Su Su',
  //     phone: '+95 9788676754',
  //     email: "susu@gmail.com",
  //     number: 115,
  //     type: "Family",
  //     checkIn: '02/10/2023',
  //     checkOut: '05/10/2023'
  //   },
  // ]

  const onFinish = (fieldsValue) => {
    console.log(fieldsValue);
    const values = {
      'type': fieldsValue['type'],
      'in-date-picker': fieldsValue['in-date-picker'] ? fieldsValue['in-date-picker'].format('DD/MM/YYYY') : null,
      'out-date-picker': fieldsValue['out-date-picker'] ? fieldsValue['out-date-picker'].format('DD/MM/YYYY') : null,
    }

    // const filteredValue = data.filter(record => {
    //   const typeFilter = !values.type || record.type.toLowerCase() === values.type.toLowerCase();

    //   const checkInDate = values['in-date-picker'];
    //   const checkOutDate = values['out-date-picker'];

    //   const checkInFilter = !checkInDate || record.checkIn.includes(checkInDate);
    //   const checkOutFilter = !checkOutDate || record.checkOut.includes(checkOutDate);

    //   return typeFilter && checkInFilter && checkOutFilter;
    // })
    setFilterValues(values);    
    setOnfilter(false);
  }

  const getUniqueTypes = (data) => {
    const types = data?.map(room => room.roomType);
    return Array.from(new Set(types))
  }

  const options = getUniqueTypes(data).map(type => ({
    value: type,
    label: type,
  }))

  if (isLoading) {
    return (
      <div className="spin-container">
        <Spin size="large"/>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.header}>
      <Typography.Title level={3} style={{color:"#262626",fontFamily:'Times New Roman, serif'}}>Occupation History</Typography.Title>
      <div className={styles.action}>
      <Input.Search placeholder="Search name,phone,email and room no" onSearch={(value) => {
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
              <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Occupancy</Typography.Title>
            </Space>
            <Divider style={{margin: "10px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                  <Form.Item name="type" label="Room Type" style={{width: 160}}>
                    <Select options={options} placeholder="Any"/>
                  </Form.Item>
                  <Form.Item name="in-date-picker" label="Check-in date">
                    <DatePicker placeholder="Select check-in" format="DD/MM/YYYY"/>
                  </Form.Item>
                  <Form.Item name="out-date-picker" label="Check-out date">
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
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}

export default OccupationHistory