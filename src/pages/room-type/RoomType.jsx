import { Table, Input, Button} from 'antd';
import { useState } from 'react';
import styles from '../pages.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllTypes } from '../../features/room-type/typeSlice';
import {TableTitle} from '../../components/typo-title'
import { formatAsUSD } from '../../currency';
// import { useGetRoomTypeQuery } from '../../features/room-type/typeApiSlice';

const RoomType = () => {
  const navigate = useNavigate();
  const types = useSelector(selectAllTypes);
  // const {data:types,isLoading,error} = useGetRoomTypeQuery();
  // console.log(types);

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: "center",
      render: (_,record,index) => index + 1
    },
    {
      title: 'Room Type',
      dataIndex: 'name',
      align: "center",
    },
    {
      title: 'Maximum Capacity',
      dataIndex: 'maximumCapacity',
      align: "center",
    },
    {
      title: 'Price per night',
      dataIndex: 'pricePerNight',
      align: "center",
      render: (_,record) => <p>{formatAsUSD(record.pricePerNight)}</p>
    },
    {
      title: 'Room Size',
      dataIndex: 'size',
      align: "center",
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Link to={`/room-type/${record?.id}`}>Edit</Link>
        )
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
          <Link to={`/room-type/detail/${record?.id}`}>Detail</Link>
        )
    }
  ]

  //   if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }    
  
  return (
    <>
      <div className={styles.header}>
        <TableTitle>Room Type Lists</TableTitle>
        <Button type='primary' className='add-btn' onClick={() => navigate('/add-room-type')}><PlusOutlined/> Add Room Type</Button>
      </div>
      <Table columns={columns} dataSource={types}  rowKey={(record) => record.id} className={styles.table}/>
    </>
  )
}

export default RoomType