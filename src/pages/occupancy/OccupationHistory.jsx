import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select } from "antd"
import styles from '../pages.module.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import { MaterialOutlined } from "../../components/material-icon/MaterialOutlined";
import { occupiedHistory } from "../../features/occupation/occupiedSlice";
import { transformedData } from "./occupyTransformData";
import { FilterTitle, TableTitle } from "../../components/typo-title";
// import { useGetOccupationHistoryQuery, useGetOccupiedByFilterQuery } from "../../features/occupation/occupiedApiSlice";

const { useToken } = theme;

const OccupationHistory = () => {
  const { token } = useToken();
  const [searchText,setSearchText] = useState("");
  const [onFilter,setOnfilter] = useState(false);
  // const [filterValues,setFilterValues] = useState({
  //   type: null,
  //   checkInDate : null,
  //   checkOutDate : null
  // });
  // const {data,isLoading,error} = useGetOccupationHistoryQuery();
  // const {data:filteredRooms,isLoading:isFRoomLoading} = useGetOccupiedByFilterQuery({
  //   ...filterValues
  // })

//   const filteredHistory = data?.map(info => transformedData(info));
//   const formattedFilteredRooms = filteredHistory?.map(room => transformedData(room));
//   const dataSource = filterValues.type || filterValues.checkInDate || filterValues.checkOutDate
// ? formattedFilteredRooms
// : filteredHistory;

// for dummy test
  const [filterValues,setFilterValues] = useState(null);
  const data = useSelector(occupiedHistory);
  const rooms = filterValues ? filterValues : data;
  // end dummy test
  const dataSource = rooms?.map(info => transformedData(info));

  const onFinish = (fieldsValue) => {
    // const filteredValue = {
    //   'type': fieldsValue['type'],
    //   'in-date-picker': fieldsValue['in-date-picker'] ? fieldsValue['in-date-picker'].format('DD/MM/YYYY') : null,
    //   'out-date-picker': fieldsValue['out-date-picker'] ? fieldsValue['out-date-picker'].format('DD/MM/YYYY') : null,
    // }

    const {type,checkInDate,checkOutDate} = fieldsValue;
    
    const occupiedType = type ? type.toLowerCase() : null;
    const checkIn = checkInDate ?  checkInDate.format('YYYY-MM-DD') : null;
    const checkOut = checkOutDate ? checkOutDate.format('YYYY-MM-DD') : null;
    
    // for dummy filter test 
    const filteredValue = data.filter(record => {
      console.log(record,checkOut);
      const typeFilter = !occupiedType || record.roomType.toLowerCase().includes(occupiedType);
      const checkInFilter = !checkIn || record.checkIn.includes(checkIn);
      const checkOutFilter = !checkOut || record.checkOut.includes(checkOut);

      return typeFilter && checkInFilter && checkOutFilter;
    })
    // end dummy test

    setFilterValues(filteredValue);    
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

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

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
  ]

  // if (isLoading) {
  //   return (
  //     <div className="spin-container">
  //       <Spin size="large"/>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <div className={styles.header}>
      <TableTitle>Occupation History</TableTitle>
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
            <FilterTitle>Filter History</FilterTitle>
            <Divider style={{margin: "10px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                  <Form.Item name="type" label="Room Type" style={{width: 160}}>
                    <Select options={options} placeholder="Any"/>
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
          <a onClick={(e) => e.preventDefault()} className={styles['filter-button']}>
            <MaterialOutlined style={{color: "#181818"}}>filter_list</MaterialOutlined>
          </a>
        </Dropdown>
      </div>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}

export default OccupationHistory