import { Input, Table, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select, Modal, message } from "antd"
import styles from '../pages.module.css';
import { useState } from "react";
// import { useCheckOutOccupiedRoomMutation, useGetOccupiedByFilterQuery, useGetOccupiedRoomQuery } from "../../features/occupation/occupiedApiSlice";
import ModalContent from '../reservation/ModalContent';
import { MaterialOutlined } from "../../components/material-icon/MaterialOutlined";
import { transformedData } from "./occupyTransformData";
import { useDispatch, useSelector } from "react-redux";
import { checkOut, occupiedRooms } from "../../features/occupation/occupiedSlice";
import { FilterTitle, TableTitle } from "../../components/typo-title";

const { useToken } = theme;

const OccupiedRooms = () => {
  const { token } = useToken();
  const [searchText,setSearchText] = useState("");
  const [onFilter,setOnfilter] = useState(false);
  // const [filterValues,setFilterValues] = useState({
  //   type: null,
  //   checkInDate : null,
  //   checkOutDate : null
  // });
  const [openCheckOutModal, setOpenCheckOutModal] = useState(false);
  const [ occupiedId, setOccupiedId] = useState(null);
  // const {data,isLoading,error} = useGetOccupiedRoomQuery();
  // const [checkOutOccupiedRoom] = useCheckOutOccupiedRoomMutation();
  // const {data,isLoading, error} = useGetOccupiedByFilterQuery({
  //   ...filterValues
  // });

  // for dummy test 
  const [filterValues,setFilterValues] = useState(null);
  const data = useSelector(occupiedRooms);
  const dispatch = useDispatch();
  const rooms = filterValues ? filterValues : data;
  //end dummy test

  const dataSource = rooms?.map(info => transformedData(info));
  
  const onFinish = (fieldsValue) => {
    // const filteredValues = {
    //   'type': fieldsValue['type'],
    //   'in-date-picker': fieldsValue['in-date-picker'] ? fieldsValue['in-date-picker'].format('DD/MM/YYYY') : null,
    //   'out-date-picker': fieldsValue['out-date-picker'] ? fieldsValue['out-date-picker'].format('DD/MM/YYYY') : null,
    // }
    const {type,checkInDate,checkOutDate} = fieldsValue;

    const occupiedType = type ? type.toLowerCase() : null;
    const checkIn = checkInDate ?  checkInDate.format('YYYY-MM-DD') : null;
    const checkOut = checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null;
    // for dummy filter test    
    const filteredValues = data.filter(room => {  
      const typeFilter = !occupiedType || room.roomType.toLowerCase().includes(occupiedType);
      const checkInFilter = !checkIn || room.checkIn.includes(checkIn);
      const checkOutFilter = !checkOut || room.checkOut.includes(checkOut);

      return typeFilter && checkInFilter && checkOutFilter;
    })
    // end dummy filter test 
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

  // const handleCheckOutModal = async () => {
  //   console.log(occupiedId);
  //   const {data,error} = await checkOutOccupiedRoom(occupiedId);
  //   console.log(data);
  //   if(data?.success){
  //     message.success(data?.message)
  //     cancelCheckOutModal()
  //   }else{
  //     cancelCheckOutModal()
  //     message.error(error?.data?.message || error?.error)
  //   }
  // }

  // for dummy test 
  const handleCheckOutModal = () => {
    dispatch(checkOut(occupiedId));
    cancelCheckOutModal();
  }
  // end dummy test
  
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.guestName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestPhone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestEmail).toLowerCase().includes(value.toLowerCase()) ||
          String(record.roomNumber).toLowerCase().includes(value.toLowerCase())
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
        <div style={{textAlign:"center"}}>
          <span>{record.guestName}</span> <br />
          <span style={{color: "#096DD9"}}>{record.guestEmail}</span>
        </div>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'guestPhone',
      align: 'center',
      render:(_,record) => <p style={{color: "#096DD9"}}>{record.guestPhone}</p>
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
          <Button type="primary" danger onClick={() => handleCheckOut(record?.id)} >Check-out</Button>
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

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  
  return (
    <>
      <div className={styles.header}>
        <TableTitle>Occupied Room Lists</TableTitle>
        <div className={styles.action}>
          <Input.Search placeholder="Search name,phone and room no" onSearch={(value) => {
              setSearchText(value);
            }} onChange={(e) => {
              setSearchText(e.target.value)
            }} style={{width: 280}}></Input.Search>
          <Dropdown trigger={['click']}
          open={onFilter}
          onOpenChange={open => setOnfilter(open)}
          dropdownRender={() => (
            <div style={contentStyle}>
              <FilterTitle>Filter Occupancy</FilterTitle>
              <Divider style={{margin: "10px 0"}}/>
              <Form layout="vertical" onFinish={onFinish}>
                <Space direction="vertical">
                    <Form.Item name="type" label="Room Type">
                      <Select options={options} placeholder="Any" style={{width: 160}}/>
                    </Form.Item>
                    <Form.Item name="checkInDate" label="Check-in date">
                      <DatePicker placeholder="Select check-in" format="DD/MM/YYYY"  style={{width: 160}}/>
                    </Form.Item>
                    <Form.Item name="checkOutDate" label="Check-out date">
                      <DatePicker placeholder="Select check-out" format="DD/MM/YYYY"  style={{width: 160}}/>
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
      <Table columns={columns} dataSource={dataSource} rowKey={(record) => record?.id} />
      <Modal centered open={openCheckOutModal} onCancel={cancelCheckOutModal} footer={null} width={300} closeIcon={false}>
          <ModalContent title="Check Out!" content="Are you sure you want to check-out this room?" onCancel={cancelCheckOutModal} onConfirm={handleCheckOutModal} 
        className={styles["cancel-yes-button"]}/>
      </Modal>
    </>
  )
}

export default OccupiedRooms;