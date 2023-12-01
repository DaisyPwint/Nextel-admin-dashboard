import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select, Modal, message } from "antd"
import styles from '../room.module.css';
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { useCheckOutOccupiedRoomMutation, useGetOccupiedByFilterQuery, useGetOccupiedRoomQuery } from "../../features/occupation/occupiedApiSlice";
import CustomButton from '../../components/button/CustomButton';

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

const OccupiedRooms = () => {
  const { token } = useToken();
  const [searchText,setSearchText] = useState("");
  const [onFilter,setOnfilter] = useState(false);
  const [filterValues,setFilterValues] = useState({
    type: null,
    checkInDate : null,
    checkOutDate : null
  });
  const [openCheckOutModal, setOpenCheckOutModal] = useState(false);
  const [ occupiedId, setOccupiedId] = useState(null);
  // const {data,isLoading,error} = useGetOccupiedRoomQuery();
  const [checkOutOccupiedRoom] = useCheckOutOccupiedRoomMutation();
  const {data,isLoading, error} = useGetOccupiedByFilterQuery({
    ...filterValues
  });

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

//   const data = [
//     {
//         "id": 1,
//         "reservationId": 3,
//         "guestName": "Jane",
//         "guestPhone": "+959123456789",
//         "guestEmail": "jane@example.com",
//         "roomNumber": 101,
//         "roomType": "Deluxe Single",
//         "checkIn": "2023-11-15T08:05:00Z",
//         "checkOut": "2023-11-15T09:28:30Z",
//         "status": "CHECKED_IN"
//     },
//     {
//         "id": 3,
//         "reservationId": 3,
//         "guestName": "Jane",
//         "guestPhone": "+959123456789",
//         "guestEmail": "jane@example.com",
//         "roomNumber": 102,
//         "roomType": "Deluxe Single",
//         "checkIn": "2023-11-15T08:05:00Z",
//         "checkOut": "2023-11-15T09:28:30Z",
//         "status": "CHECKED_IN"
//     }
// ]

const dataSource = data?.map(info => transformedData(info));
// console.log(allOccupiedRooms);
// const  = filteredRooms?.map(room => transformedData(room));

// const dataSource = filterValues.type || filterValues.checkInDate || filterValues.checkOutDate
// ? formattedFilteredRooms
// : allOccupiedRooms;

  const onFinish = (fieldsValue) => {
    console.log(fieldsValue);

    // const {type,checkInDate,checkOutDate} = fieldsValue;
    // const filteredValues = {
    //     type,
    //     checkInDate: checkInDate ? checkInDate.format('YYYY-MM-DD') : null,
    //     checkOutDate: checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null
    //   }

    const filteredValues = {
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
    console.log(filteredValues);
    setFilterValues(filteredValues);    
    setOnfilter(false);
  }

  const handleCheckOut = (id) => {
    setOccupiedId(id);
    setOpenCheckOutModal(true);
  }

  const cancelCheckOutModal = () => {
    setOpenCheckOutModal(false);
    setOccupiedId(null);
  }

  const handleCheckOutModal = async () => {
    console.log(occupiedId);
    const {data,error} = await checkOutOccupiedRoom(occupiedId);
    console.log(data);
    if(data?.success){
      message.success(data?.message)
      cancelCheckOutModal()
    }else{
      cancelCheckOutModal()
      message.error(error?.data?.message || error?.error)
    }
  }

  
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
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Button type="primary" className={`add-btn`} danger onClick={() => handleCheckOut(record?.id)} >Check-out</Button>
        )
    },
  ]

  const getUniqueTypes = (data) => {
    const types = data?.map(room => room.roomType);
    return Array.from(new Set(types))
  }

  const options = getUniqueTypes(data).map(type => ({
    value: type,
    label: type,
  }))
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.header}>
      <Typography.Title level={3} style={{color:"#262626",fontFamily:'Times New Roman, serif'}}>Occupied Room Lists</Typography.Title>
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
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record?.id} />
      
         {/* openCheckOutModal && ( */}
          <Modal centered open={openCheckOutModal} onCancel={cancelCheckOutModal} footer={null} width={300} closeIcon={false}>
            <div className={styles['checkIn-container']}>
              <h2>Check Out!</h2>
              <p>Are you sure you want to check-out this room?</p>
              <div className={styles["button-container"]}>
                  <CustomButton className={styles["no-button"]} onClick={cancelCheckOutModal}>No</CustomButton>
                  <CustomButton className={styles["yes-button"]} onClick={handleCheckOutModal}>Yes</CustomButton>
              </div>
            </div>
        </Modal>
        
    </>
  )
}

export default OccupiedRooms;